<template>
  <div class="app-container ">
  
      <div class="navbari">
        <top-navigation />
      </div>
      <div class="content ">
        <home-page />
    
    </div>
    <div id="text-editor" class="editor-section flex justify-center items-center flex-col">
      <h1 class="text-4xl md:text-6xl font-bold mb-10 text-white ">
        Write down your code here
      </h1>
      <div class="editor-container " ref="editorContainer">
        <code-editor />
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavigation from '@/components/topNavigation.vue';
import HomePage from '@/components/HomePage.vue';
import codeEditor from '@/components/codeEditor.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const editorContainer = ref(null);

const handleResize = () => {
  // Adjust the maxHeight of the editor container based on the viewport height if needed
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Call once on mount
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width:100%;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}



.navbari {
  z-index: 2;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  margin-top: 190px;
}

.editor-section {
  padding: 20px;
  width: 100%;
  margin-top: 80px;
  margin-bottom:80px ;
  z-index: 2;
}

.editor-container {
  position: relative; /* Required for the pseudo-element to be positioned correctly */
  margin-top: 20px;
  width: 54%;
  border-radius: 10px;
  max-height: 60vh; /* Set a reasonable height for the editor */
  overflow: auto; /* Allow scrolling if the editor content exceeds the container height */
  z-index: 1;
  background-color: #0d0d0d;
  background: linear-gradient(135deg, rgba(255, 107, 203, 0.5), rgba(106, 0, 255, 0.5));
   /* Assuming a dark background for contrast */
}






/* Styles for the background lines */
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
