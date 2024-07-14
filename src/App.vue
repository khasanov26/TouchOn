<script setup>
import { ref, computed, provide, watch, onMounted, inject } from 'vue';

import ContactService from './services/contactService.js'

import ContactList from './components/ContactList.vue'
import SearchBar from './components/SearchBar.vue'
import ContatactForm from './components/ContactForm.vue'
import ContactEditForm from './components/ContactEditForm.vue';

const contacts = ref([])

const GStore = inject('GStore')

onMounted(async() => {
  const localContacts = localStorage.getItem('contactsStorage');
  contacts.value = localContacts ? JSON.parse(localContacts) : [];
})

const deleteContact = (contactRemove) => {
  contacts.value = contacts.value.filter(contact => contact != contactRemove)
}

const searchValue= ref('');

const searchContacts = computed(() => {
  const query = searchValue.value.trim().toLowerCase();
  if (!query) {
    return contacts.value;
  } else {
    return contacts.value.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
  }
});

const editedContact = ref(null);

const startEditing = (contact) => {
  GStore.errorMessage = ''
  editedContact.value = contact;
};

const saveContact = (updatedContact) => {
  const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);
  if (index !== -1) {
    contacts.value[index] = updatedContact;
  }
  editedContact.value = null;
};

provide('editedContact', editedContact)

const downloadContact = () => {
  ContactService.getContacts()
    .then((res) => res.json())
    .then((res) => {
      contacts.value = [...contacts.value, ...res] 
      showBtnDownload.value = false
      localStorage.setItem('showBtnDownloadStorage', false);
    })
    .catch((err) => {
      console.log(err);
    })
}

const showBtnDownload = ref(null)
const localContacts = localStorage.getItem('showBtnDownloadStorage');
if(localContacts === 'false') {
  showBtnDownload.value = false
}else {
  showBtnDownload.value = true
}

watch(
  contacts,
  () => {
    localStorage.setItem('contactsStorage', JSON.stringify(contacts.value))
    if(contacts.value.length == 0) {
      showBtnDownload.value = true
    }else {
      showBtnDownload.value = false
    }
  },
  { deep: true }
)

</script>

<template>
  <div class="app-main">
    <ContactList :contacts="searchContacts" @delete-contact="deleteContact" @edit-contact="startEditing"
      :showBtnDownload="showBtnDownload" @download-contact="downloadContact"
    />
    <SearchBar v-if="!editedContact" v-model="searchValue"/>
    <ContatactForm v-if="!editedContact" :contacts="searchContacts" />
    <ContactEditForm v-if="editedContact" :contact="editedContact" :onSave="saveContact" />
  </div>
</template> 

<style>

.app-main {
  margin: 0 auto;
  max-width: 800px;
}

* {
    box-sizing: border-box;
}

body {
  font-family: "Oswald", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
p, ul {
  margin: 0;
}

ul {
  list-style-type: none;
}

input {
  padding: 0 10px;
  border: 1px solid #c4c4c4;
  max-width: 500px;
  width: 100%;
  height: 44px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

input::placeholder {
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  color: #828282;
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
}

button {
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  background: #000;
  height: 35px;
  color: #fff;
  cursor: pointer;
  font-family: "Oswald", sans-serif;
  border: none;
}

.errorMessage {
  color: #eb5757;
}

</style>