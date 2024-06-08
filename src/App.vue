<script setup>
import { RouterView } from 'vue-router'
import toastItem from './components/toastItem.vue';
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden flex justify-center">
    <toast-item />
    <RouterView />
  </div>
</template>

<style scoped></style>