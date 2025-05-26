<template>
    <Toast ref="toastRef" />
    <Modal v-model="isOpen" title="Delete Customer">
        <p>Are you sure you want to delete this customer?</p>
        <template #footer>
            <button
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ml-2"
                @click="deleteCustomer"
            >
                Delete
            </button>
            
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
import Modal from './Modal.vue'
import { ref, watch } from 'vue'

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
const isOpen = ref(props.modelValue)
const customer = ref<Customer | undefined>(props.customerData)
const toastRef = ref()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'customer-deleted'): void
}>()

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

const deleteCustomer = async () => {
    const token = useCookie('auth_token')
    const config = useRuntimeConfig()
    try {  
        console.log('Delete customer', customer.value?.id)
        const response = await $fetch<{ data: any[]; status: number, message: string }>(`${config.public.apiBase}/customers/${customer.value?.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 200) {
            toastRef.value?.showToast('Customer deleted successfully', 'success')
            emit('customer-deleted')
        } else {
            toastRef.value?.showToast(response.message, 'error')
        }
        close()
    } catch (error: any) {
        toastRef.value?.showToast(error.message, 'error')
        console.log(error)
    }
}
</script>