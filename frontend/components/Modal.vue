<template>
    <Teleport to="body" @mousedown="close">
   
      <div v-if="isOpen" class="fixed inset-0 z-[9999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Background overlay -->
        <div 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          @click="close"
        ></div>

        <!-- Modal panel -->
        <div class="fixed inset-0 overflow-y-auto" @click="close">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div 
              ref="modalContent"
              class="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
              @click.stop
            >
              <!-- Header -->
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                    {{ title }}
                  </h3>
                  <button
                    @click="close"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span class="sr-only">Close</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <slot name="footer">                 
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>

  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string  
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Modal'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = ref(props.modelValue)
const modalContent = ref<HTMLElement | null>(null)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

const close = () => {
  isOpen.value = false
  emit('update:modelValue', false)
}
</script>

