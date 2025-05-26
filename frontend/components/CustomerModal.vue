<template>
  <Modal v-model="isOpen" title="Customer Details">
    <div v-if="customer" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <p class="mt-1 text-sm text-gray-900">{{ customer.firstName }} {{ customer.lastName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">{{ customer.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-sm text-gray-900">{{ customer.phoneNumber }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <p class="mt-1 text-sm text-gray-900">{{ customer.address }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4">
      <p class="text-gray-500">No customer data available</p>
    </div>
    <template #footer>
        <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="close"
            >   
            Close
            </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Modal from './Modal.vue'

interface Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

interface Props {
  modelValue: boolean
  customerData?: Customer
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = ref(props.modelValue)
const customer = ref<Customer | undefined>(props.customerData)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

watch(() => isOpen.value, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.customerData, (newValue) => {
  customer.value = newValue
})

const close = () => {
    isOpen.value = false
}

</script> 