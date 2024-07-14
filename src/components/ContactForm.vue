<script setup>
import { defineProps, inject, reactive, ref, toRefs  } from 'vue';
import { validatePhone, validateEmail, validateName } from '../utils';

const props = defineProps({
  contacts: Array
})

const { contacts } = toRefs(props);

const lastId = ref((contacts.value[contacts.value.length - 1]?.id) || 0)

const nextId = ref(lastId)

const newContact = reactive({
  id: nextId.value,
  name: '',
  phone: '',
  email: ''
})

const GStore = inject('GStore')

const addContact = () => {
  if (!validateName(newContact.name)) {
    GStore.errorMessage = 'Введите имя'
    return;
  }

  if (!validatePhone(newContact.phone)) {
    GStore.errorMessage = 'Введите корректный номер телефона'
    return;
  }
  
  if (!validateEmail(newContact.email)) {
    GStore.errorMessage = 'Введите корректный email'
    return;
  }

  GStore.errorMessage = ''

  nextId.value = lastId.value + 1
  newContact.id = nextId.value;
  
  contacts.value.push({...newContact});

  newContact.name = '';
  newContact.phone = '';
  newContact.email = '';
}

</script>

<template>
  <div>
    <p class="title">Добавление</p>
    <p class="errorMessage">{{ GStore.errorMessage }}</p>
    <div class="contacts-add">
      <input type="text" v-model="newContact.name" placeholder="Имя">
      <input type="text" v-model="newContact.phone" placeholder="Tелефон">
      <input type="text" v-model="newContact.email" placeholder="email">
      <button @click="addContact">Добавить контакт</button>
    </div>
  </div>
</template> 

<style scoped>
.title {
  font-size: 20px;
  line-height: 278%;
}

.contacts-add {
  display: flex;
  flex-direction: column;
  row-gap: 3px;
}

button {
  margin-top: 5px;
  max-width: 500px;
  width: 100%;
}

</style>