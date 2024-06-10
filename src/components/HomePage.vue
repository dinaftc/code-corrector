<template>
  <header class="text-center bg-background text-white w-full ">
  
     <Typed :options="options">
      
        <h1 class="typing text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text w-full"></h1>
        
    
      </Typed>
      <h1 class="text-4xl md:text-6xl font-bold ">
   
      your favourite code corrector <span class="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">!</span>
    </h1>
    <p class="text-gray-400 mb-10 text-lg max-w-4xl mx-auto">
      Code corrector and assistant, designed to help you improve your Python coding skills with ease and efficiency. With automatic error detection and correction, code optimization suggestions, and real-time feedback and guidance, you can write better Python code faster and with more confidence.
    </p>
    <div class="flex justify-center space-x-4">
      <router-link :to="{ name: 'text-editor' }" class="bg-primary text-white text-lg px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300">
        Try it now
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";

const options: TypedOptions = {
  strings: ["Mr Python"],
  loop: true,
  typeSpeed: 150,
};
</script>
