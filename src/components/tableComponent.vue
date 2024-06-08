<template>
  <div>
    <codemirror
  v-model="usePrediction.testCasesInput"
  placeholder="Test Cases here,syntax: [[[5,3],2],[[a,b],c]]..."
  :style="{ height: '590px', width: '400px' }"
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
</template>

<script>
import { defineComponent, ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { coolGlow } from 'thememirror'
import { usePredictionStore } from '@/stores/predict'

export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const usePrediction = usePredictionStore()
    const extensions = [javascript(), coolGlow]
    const view = shallowRef()

    const handleReady = (payload) => {
      view.value = payload.view
      
    }

    const dropdownStyle = ref({})

    

    watch(view)

    return {
      extensions,
      handleReady,
      log: console.log,
      dropdownStyle,
      usePrediction
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
