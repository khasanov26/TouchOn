<script setup>
import { defineModel } from 'vue';

const searchValue = defineModel()


</script>

<template>
  <div>
    <input type="text" v-model="searchValue" placeholder="поиск">
  </div>
</template> 

<style scoped>
input {
  margin: 20px 0;
}
</style>