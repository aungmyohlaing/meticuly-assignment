<template>
    <div class="py-6">
      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-lg font-medium text-gray-900">Create New Customer</h2>
            <p class="mt-1 text-sm text-gray-500">Add a new customer to your system.</p>
          </div>
  
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
  
          <div v-if="error" class="px-4 py-5 sm:px-6">
            <p class="text-red-500">{{ error }}</p>
          </div>
  
          <form @submit.prevent="handleSubmit" class="px-4 py-5 sm:p-6">
            <div class="space-y-6">
              <FormInput v-model="form.firstName" label="First Name" id="firstName" required />
              <FormInput v-model="form.lastName" label="Last Name" id="lastName" required />
              <FormInput v-model="form.email" label="Email" id="email" type="email" required />
              <FormInput v-model="form.phoneNumber" label="Phone" id="phone" type="tel" required />
              <FormInput v-model="form.address" label="Address" id="address" required />
  
              <div class="flex justify-between space-x-3">
                <button
                  type="button"
                  @click="router.back()"
                  class="px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <div class="flex space-x-2">
                  <button
                    v-if="confirmed && suggestedCustomers.length > 0"
                    type="button"
                    @click="resetConfirmation"
                    class="px-4 py-2 text-sm text-gray-500 hover:underline"
                  >
                    Cancel Confirmation
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="px-4 py-2 text-sm rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark disabled:opacity-50"
                  >
                    {{ confirmed ? 'Confirm & Create' : 'Create Customer' }}
                  </button>
                </div>
              </div>
            </div>
          </form>
  
          <div v-if="suggestedCustomers.length > 0" class="px-4 pb-4">            
            <DuplicatePanel :suggestedCustomers="suggestedCustomers" :viewCustomer="viewCustomer" :ignoreCustomer="ignoreCustomer" />
          </div>
  
          <Toast ref="toastRef" />

          <CustomerModal v-model="showCustomerModal" :customerData="selectedCustomer" />
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import DuplicatePanel from '@/components/DuplicatePanel.vue'
  import Toast from '@/components/Toast.vue'
  import FormInput from '@/components/FormInput.vue'
  import CustomerModal from '@/components/CustomerModal.vue'

  const router = useRouter()
  const loading = ref(false)
  const error = ref('')
  const suggestedCustomers = ref<any[]>([])
  const confirmed = ref(false)
  const isSubmitting = ref(false)
  const toastRef = ref()
  const showCustomerModal = ref(false)
  const selectedCustomer = ref<any>(null)
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  })
  
  const resetForm = () => {
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
    }
    confirmed.value = false
    suggestedCustomers.value = []
  }
  
  const resetConfirmation = () => {
    confirmed.value = false
    suggestedCustomers.value = []
  }
  
  const handleSubmit = async () => {
    try {
      isSubmitting.value = true
      const token = useCookie('auth_token')
      const config = useRuntimeConfig()
  
      const response = await $fetch<{ data: any[]; status: number, message: string }>(
        `${config.public.apiBase}/customers`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          body: {
            ...form.value,
            checkOnly: !confirmed.value,
          },
        }
      )
  
      if (response.status === 200 && !confirmed.value) {
        if (response.data.length > 0) {
          suggestedCustomers.value = response.data
          confirmed.value = true
          return
        }
        // If no suggested customers, proceed to create directly
        confirmed.value = true
        await handleSubmit()
        return
      }
  
      if (response.status === 201) {
        toastRef.value?.showToast('Customer created successfully', 'success')

        setTimeout(() => {
          resetForm()
          router.push('/dashboard')
        }, 1000)        
      } 
    } catch (err: any) {
      console.error('Error creating customer:', err)
      if (err.status === 409) {
        toastRef.value?.showToast('Customer already exists with same phone number', 'error')              
      } else if (err.status === 403) {
        toastRef.value?.showToast('You are not authorized to create a customer', 'error')
      } else {
        toastRef.value?.showToast('Failed to create customer', 'error')        
      }
    } finally {
      isSubmitting.value = false
    }
  }
  const viewCustomer = (customer: any) => {    
    selectedCustomer.value = customer
    showCustomerModal.value = true
  }
  const ignoreCustomer = () => {    
    resetConfirmation()
  }
  </script>
  