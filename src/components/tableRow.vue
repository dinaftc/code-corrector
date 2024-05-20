<template>
    <tr >
      <th class="px-4 py-2  text-center">{{ index }}</th>
      <td class="px-4 py-2 ">{{ rowData.input1 }}</td>
      <td class="px-4 py-2 ">{{ rowData.input2 }}</td>
      <td class="px-4 py-2 ">{{ rowData.expectedOutput }}</td>
    </tr>
  </template>
  
  <script setup>
  // Define props
  defineProps({
    rowData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  });
  </script>
  