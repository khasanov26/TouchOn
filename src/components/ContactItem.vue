<script setup>
  import { defineProps, inject } from 'vue';

  defineProps({
    name: String,
    phone: String,
    email: String,
    onClickDeleteContact: Function,
    onClickEditContact: Function
  })

  const editedContact = inject('editedContact')
  
</script>

<template>
    <li>
      {{ name }} {{ phone }} {{ email }} <br> 
      <button @click="onClickEditContact">изменить</button>
      <button class="delete-btn" v-if="!editedContact" @click="onClickDeleteContact">удалить</button>
    </li>
</template> 

<style scoped>
  li {
    color: #3f3f3f;
    font-size: 18px;
    line-height: 167%;
  }

  .delete-btn {
    background: #eb5757;
    margin-left: 5px;
  }

  br {
    display: none;
  }

  @media(max-width: 576px) {
    br {
      display:block
    }
  }
</style>