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
    <div class="w-full flex flex-col gap-2 py-2 items-start mx-1">
      <label class="text-md text-secondary">Line Number</label>
      <input 
        v-model="lineNumber" 
        @input="checkLineForInstruction" 
        placeholder="Line number" 
        class="px-4 py-4 border border-gray-300 rounded-md text-secondary bg-codemirror-bg"
      />
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

const lineNumber = ref("")
const PredictedResults = ref(null)

const view = shallowRef()
const handleReady = payload => {
  view.value = payload.view
}

const log = console.log

const checkLineForInstruction = () => {
  const lines = codeToPredict.value.split('\n');
  const lineIndex = parseInt(lineNumber.value) - 1;

  if (lineIndex >= 0 && lineIndex < lines.length) {
    const line = lines[lineIndex].trim();

    if (line.startsWith('if') || line.includes(' if ') || line.startsWith('while') || line.includes(' while')) {
      selectedInstruction.value = 'Condition';
    } else if (line.includes('=')) {
      selectedInstruction.value = 'Affectation';
    } else {
      selectedInstruction.value = 'Instruction Type'; // Default or other type
    }
  }
};

const correctTheProgram = async () => {
  usePrediction.codeToPredict = codeToPredict.value
  usePrediction.lineNumber = lineNumber.value

  usePrediction.InstructionType = selectedInstruction.value
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
