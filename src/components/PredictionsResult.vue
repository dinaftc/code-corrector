<template>
    <div class="app-container min-h-screen flex flex-col">
      <!-- Navigation Bar -->
      <div class="navbari  p-4 shadow-md">
        <top-navigation />
      </div>
  
      <!-- Loading Spinner (if needed) -->
      <div class="w-full h-full flex justify-center items-center" v-if="usePrediction.loading">
        <span class="loading loading-spinner loading-lg border-secondary"></span>
      </div>
  
      <!-- Main Content -->
      <div id="text-editor" v-else class="editor-section flex-grow flex flex-col items-center justify-center  text-white px-4 pb-4">
        <h1 class="text-5xl md:text-5xl font-bold mb-10">Results</h1>
  
        <div class="w-full h-full flex flex-col lg:flex-row gap-4 px-4">
  
          <!-- Code Editor Section -->
          <div class="{{ usePrediction.erroring ? 'w-full' : 'w-full lg:w-1/2' }} flex flex-col items-center">
            <h3 class="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Correct Program:
            </h3>
            <Codemirror
              :style="{ height: '500px', width: '100%' }"
              v-model="usePrediction.PredictedResults.new_program  "
              class="w-full placeholder-secondary"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              @ready="handleReady"
              @change="log('change', $event)"
              @focus="log('focus', $event)"
              @blur="log('blur', $event)"
            />
          </div>
  
          <!-- Statistics Section -->
          <div class="w-full lg:w-1/2 flex flex-col items-center" v-if="usePrediction.erroring">
            <h3 class="text-3xl font-bold  bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Statistics:
              </h3>
              <div class="w-full flex flex-col bg-codemirror-bg border-none rounded-md my-4 mx-4 p-4" :style="{ height: '500px', width: '100%' }">
            <div class="w-full flex flex-col my-4 items-center">
              <h3 class="text-2xl mb-1 text-[#2962ff]">Best Expression:</h3>
              <pre class="text-2xl ">{{usePrediction.PredictedResults.best_expression}}</pre>
            </div>
            <div class="w-full flex flex-col my-4 items-center">
              <h3 class="text-2xl mb-1 text-[#2962ff]">Elapsed Time:</h3>
              <pre class="text-2xl ">{{usePrediction.PredictedResults.elapsed_time.toFixed(2)}} seconds</pre>
            </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, shallowRef } from 'vue'
  import { Codemirror } from 'vue-codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  import { coolGlow } from 'thememirror'
  import topNavigation from './topNavigation.vue'
  import { usePredictionStore } from '@/stores/predict'
  
  const usePrediction = usePredictionStore()
  const extensions = [javascript(), coolGlow]
  
  const PredictedResults = ref({})
  const view = shallowRef(null)
  const ErrorExpression = ref('No solution found within the time limit')
  const handleReady = payload => {
    view.value = payload.view
  }
  
  const log = console.log
  
//   onMounted(() => {
//     PredictedResults.value = usePrediction.predictedResults
//     console.log(usePrediction.predictedResults)
//     console.log(PredictedResults.value)
//   })
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

.bg-codemirror-bg {
    background-color: #060521;
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
