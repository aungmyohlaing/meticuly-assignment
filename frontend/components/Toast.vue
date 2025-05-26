<template>
    <div
      v-if="message"
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white max-w-sm text-center z-[9999]"
      :class="{
        'bg-green-500': type === 'success',
        'bg-red-500': type === 'error',
        'bg-blue-600': type === 'info' || !type
      }"
    >
      {{ message }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onUnmounted } from 'vue'

  const message = ref('')
  const type = ref<'success' | 'error' | 'info'>('success')
  let timeoutId: NodeJS.Timeout | null = null
  
  const showToast = (msg: string, toastType: 'success' | 'error' | 'info' = 'success') => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    message.value = msg
    type.value = toastType

    timeoutId = setTimeout(() => {
      message.value = ''
    }, 3000)
  }

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })

  defineExpose({ showToast })
  </script>

  

  