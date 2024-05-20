<template>
    <div class="app-container">
      <div class="navbari">
        <top-navigation />
      </div>
      
      <div id="text-editor" class="editor-section flex flex-col items-center justify-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-10 text-white">
          Write down your code here
        </h1>
        <div class="w-full h-full flex flex-row gap-16 items-start justify-center">
           
          <div class="editor-container w-1/2 h-full">
            <code-editor />
          </div>
         
          <div class="test-case-container w-96 h-full flex flex-col bg-editorbg justify-start rounded-md items-center px-4 pb-4">
           
            <table-component />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import TopNavigation from '@/components/topNavigation.vue';
  import codeEditor from '@/components/codeEditor.vue';
  import tableComponent from '@/components/tableComponent.vue';
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
  
  .navbari {
    z-index: 2;
  }
  
  .editor-section {
    padding: 20px;
    width: 100%;
    z-index: 2;
    height: 100%;
  }
  
  .editor-container {
    position: relative;
    border-radius: 10px;
    height: 100%; /* Set a reasonable height for the editor */
    overflow: auto; /* Allow scrolling if the editor content exceeds the container height */
    z-index: 1;
  }
  
  .test-case-container {
    margin-top: 0; /* Ensure there's no extra margin pushing the test cases down */
  }
  
  .app-container::before,
  .app-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* Ensure lines are behind content */
  }
  
  .app-container::before {
    background: repeating-linear-gradient(
      to bottom,
      #6a00ff, /* Primary color */
      #6a00ff 0.5px,
      transparent 0.5px,
      transparent 100px
    );
  }
  
  .app-container::after {
    background: repeating-linear-gradient(
      to right,
      #6a00ff, /* Primary color */
      #6a00ff 0.5px,
      transparent 0.5px,
      transparent 100px
    );
  }
  </style>
  