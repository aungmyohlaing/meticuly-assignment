<template>
  <div class="py-6">
    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Customers List -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 class="text-lg font-medium text-gray-900">Customers</h2>
            <p class="mt-1 text-sm text-gray-500">A list of all customers in your system.</p>
          </div>
          <button
            @click="navigateToCreate"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            + New Customer
          </button>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="px-4 py-5 sm:px-6">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- Customers Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>                
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ customer.firstName }} {{ customer.lastName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ customer.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ customer.phoneNumber }}</div>
                </td>                
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewCustomer(customer.id)"
                    class="text-primary hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    @click="deleteCustomer(customer.id)"
                    class="text-red-500 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Toast ref="toastRef" />
    <CustomerModal v-model="showCustomerModal" :customerData="selectedCustomer" />
    <DeleteModal v-model="showDeleteModal" :customerData="selectedCustomer" @customer-deleted="fetchCustomers" />
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import CustomerModal from '@/components/CustomerModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
definePageMeta({
  layout: 'default',
})

interface Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string  
}

const customers = ref<Customer[]>([])
const loading = ref(true)
const error = ref('')
const router = useRouter()
const toastRef = ref()
const showCustomerModal = ref(false)
const selectedCustomer = ref<any>(null)
const showDeleteModal = ref(false)

// Fetch customers data
const fetchCustomers = async () => {
  try {
    loading.value = true
    const token = useCookie('auth_token')
    const config = useRuntimeConfig()
    const response = await $fetch<{ data: Customer[] }>(`${config.public.apiBase}/customers`, {
      method: 'GET',      
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })

    customers.value = response.data
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to fetch customers'
    toastRef.value?.showToast(error.value, 'error')
  } finally {
    loading.value = false
  }
}

// Navigate to create customer page
const navigateToCreate = () => {
  router.push('/customers/create')
}

// View customer details
const viewCustomer = (id: number) => { 
  selectedCustomer.value = customers.value.find(customer => customer.id === id) || null
  showCustomerModal.value = true
}

// Delete customer
const deleteCustomer = (id: number) => {
  selectedCustomer.value = customers.value.find(customer => customer.id === id) || null
  showDeleteModal.value = true
}

// Fetch customers when component is mounted
onMounted(() => {
  fetchCustomers()
})
</script> 