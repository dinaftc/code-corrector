<template>
    <div>
      
      <codemirror 
        v-model="code"
        placeholder="Code goes here..."
        :style="{ height: '400px', width: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
      <select v-model="selectedInstruction" class=" px-4 py-4 my-4 mr-4 border-secondary text-secondary border rounded-md  bg-codemirror-bg ">
        <option v-for="instruction in instructions" :key="instruction" :value="instruction">
          {{ instruction }}
        </option>
      </select>
      <select v-model="selectedLine" class=" px-4 py-4 my-4 ml-10 border-secondary text-secondary border rounded-md  bg-codemirror-bg ">
        <option v-for="line in lines" :key="line" :value="line">
          {{ line }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
    import { defineComponent, ref, shallowRef, watch } from 'vue'
    import { Codemirror } from 'vue-codemirror'
    import { javascript } from '@codemirror/lang-javascript'
    import { coolGlow } from 'thememirror'
  
    export default defineComponent({
      components: {
        Codemirror
      },
      setup() {
        const code = ref(`test_cases = [
    ((1, 2), 1),
    ((5, 6), 1),
    ((5, 8), 3),
    ((1, 6), 5),
    ((1, 8), 7),
    ((10, 2), 8),
    ((10, 6), 4),
    ((5, 2), 3),
    ((10, 8), 2),
  ]
  #Replace this with your real test cases`)
        const extensions = [javascript(), coolGlow]
  
        const instructions = ref(["Instruction Type","Instruction 1", "Instruction 2", "Instruction 3"])
        const selectedInstruction = ref(instructions.value[0])
        const lines = ref(["line number", "Instruction 2", "Instruction 3"])
        const selectedLine = ref(lines.value[0])
  
        const view = shallowRef()
  
        const handleReady = (payload) => {
          view.value = payload.view
          updateDropdownStyle()
        }
  
        const dropdownStyle = ref({})
  
        const updateDropdownStyle = () => {
          const editorNode = view.value.dom
          const editorStyle = getComputedStyle(editorNode)
          dropdownStyle.value = {
            backgroundColor: editorStyle.backgroundColor,
            color: editorStyle.color
          }
        }
  
        watch(view, updateDropdownStyle)
  
        return {
          code,
          extensions,
          instructions,
          selectedLine,lines,
          selectedInstruction,
          handleReady,
          log: console.log,
          dropdownStyle
        }
      }
    })
  </script>
  
  <style scoped>
  /* Custom utility classes to match Codemirror editor style */
  .bg-codemirror-bg {
    background-color: #060521;
  }
  
  .text-codemirror-text {
    color: var(--codemirror-text-color);
  }
  </style>
  