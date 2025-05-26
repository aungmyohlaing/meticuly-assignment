<template>
    <div class="mb-4">
      <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        :required="required"
        :disabled="disabled"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        @input="$emit('update:modelValue', inputValue)"
      />
      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  })
  
  const emits = defineEmits(['update:modelValue'])
  
  const inputValue = ref(props.modelValue)
  
  watch(() => props.modelValue, (val) => {
    inputValue.value = val
  })
  </script>
  