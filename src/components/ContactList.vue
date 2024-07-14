<script setup>
  import { defineProps, defineEmits } from 'vue';
  import ContactItem from '../components/ContactItem.vue'

  defineProps({
    contacts: Array,
    showBtnDownload: Boolean
  })

  const emit = defineEmits(['deleteContact', 'downloadContact'])

  const downloadContact = () => {
    emit('downloadContact');
  };

</script>

<template>
  <div>
    <span class="title">Список контактов</span>
    <button v-if="showBtnDownload" @click="downloadContact" >Загрузить контакты</button>
    <TransitionGroup name="list" tag="ul">
      <ContactItem v-for="contact in contacts" 
        :key="contact.id"
        :name="contact.name"
        :phone="contact.phone"
        :email="contact.email"
        :onClickDeleteContact="() => emit('deleteContact', contact)"
        :onClickEditContact="() => emit('editContact', contact)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.title {
  font-size: 22px;
  line-height: 278%;
}

ul {
  border: 1px solid #c4c4c4;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 170px;
  overflow-y: auto;
}

button {
  margin-left: 10px;
}
</style>