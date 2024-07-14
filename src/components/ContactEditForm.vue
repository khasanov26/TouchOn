<script setup>
import { watch, defineProps, inject, ref } from 'vue';
import { validatePhone, validateEmail, validateName } from '../utils';

const GStore = inject('GStore')

const props = defineProps({
  contact: Object,
  onSave: Function
});

const editedContact = ref({ ...props.contact });

watch(() => props.contact, (newContact) => {
  editedContact.value = { ...newContact };
});

const submitForm = () => {
  if (!validateName(editedContact.value.name)) {
    GStore.errorMessage = 'Введите имя'
    return;
  }
  if (!validatePhone(editedContact.value.phone)) {
    GStore.errorMessage = 'Введите корректный номер телефона'
    return;
  }
  if (!validateEmail(editedContact.value.email)) {
    GStore.errorMessage = 'Введите корректный email'
    return;
  }

  GStore.errorMessage = ''
  props.onSave(editedContact.value);

};
</script>

<template>
  <div>
    <p class="title">Изменение контакта</p>
    <p class="errorMessage">{{ GStore.errorMessage }}</p>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label> <br>
        <input v-model="editedContact.name" type="text" id="name" required />
      </div>
      <div>
        <label for="phone">Phone:</label> <br>
        <input v-model="editedContact.phone" type="tel" id="phone" required />
      </div>
      <div>
        <label for="email">Email:</label> <br>
        <input v-model="editedContact.email" type="email" id="email" required />
      </div>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<style scoped>
  .title {
    font-size: 20px;
    line-height: 278%;
    font-weight: 400;
  }

  label {
    margin-right: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  button {
    margin-top: 5px;
    max-width: 500px;
    width: 100%;
  }
</style>
