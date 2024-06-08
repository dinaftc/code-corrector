<template>
  <div class="flex flex-col w-full h-full">
    <codemirror 
      v-model="codeToPredict"
      placeholder="Code goes here, Make sure to include classes and method..."
      :style="{ height: '500px' }"
      class="placeholder-secondary w-full"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
    <div class="w-full flex flex-wrap gap-2 p-2 items-center justify-center">
      <select v-model="selectedInstruction" class="px-4 py-4 my-2 mx-4 border-secondary text-secondary border rounded-md bg-codemirror-bg">
        <option v-for="instruction in instructions" :key="instruction" :value="instruction">{{ instruction }}</option>
      </select>
      <input v-model="wronginstruction" placeholder="Wrong instruction" class="px-4 py-4 my-2 mx-4 border-secondary text-secondary border rounded-md bg-codemirror-bg placeholder-secondary" />
      <select v-model="lineNumber" class="px-4 py-4 my-2 mx-4 border-secondary text-secondary border rounded-md bg-codemirror-bg">
        <option v-for="line in lines" :key="line" :value="line">{{ line }}</option>
      </select>
    </div>
    <button class="btn btn-primary my-8" @click="correctTheProgram">Correct program</button>
    
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { coolGlow } from 'thememirror'

import { usePredictionStore } from '@/stores/predict'
import { defineProps } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})

const usePrediction = usePredictionStore()
const codeToPredict = ref('')
const wronginstruction = ref('')
const extensions = [javascript(), coolGlow]
const instructions = ref(["Instruction Type", "Affectation", "Condition", "Logique"])
const selectedInstruction = ref(instructions.value[0])
const lines = ref(["line number", "6", "7", "8", "9", "10"])
const lineNumber = ref("line number")
const PredictedResults = ref(null)

const view = shallowRef()
const handleReady = payload => {
  view.value = payload.view
}

const log = console.log

const correctTheProgram = async () => {
  usePrediction.codeToPredict = codeToPredict.value
  usePrediction.lineNumber = lineNumber.value
  usePrediction.wronginstruction  = wronginstruction.value

  try {
    await usePrediction.correctProgram()
    if (usePrediction.PredictedResults) {
      PredictedResults.value = usePrediction.PredictedResults
      codeToPredict.value = PredictedResults.value.new_program
    }
  } catch (error) {
    console.error("Error correcting the program:", error)
  } finally {
    console.log('weeee')
  }
}
</script>

<style scoped>
/* Custom utility classes to match Codemirror editor style */
.bg-codemirror-bg {
  background-color: #060521;
}

.text-codemirror-text {
  color: var(--codemirror-text-color);
}
.input-text {
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 0.375rem;
  background-color: var(--codemirror-bg);
  color: var(--secondary-color);
}
.input-text {
  flex: 1 1 auto;
}
</style>
