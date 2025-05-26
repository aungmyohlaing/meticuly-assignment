<!-- components/DuplicatePanel.vue -->
<template>
    <div v-if="suggestedCustomers.length" class="bg-white p-4 rounded-xl shadow border border-gray-200 mt-6">
      <h2 class="text-xl font-semibold text-primary mb-4">Possible Duplicates</h2>
      <ul>
        <li
          v-for="customer in suggestedCustomers"
          :key="customer.id"
          class="border-t border-gray-200 py-3 first:border-t-0"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p class="font-medium text-gray-800">{{ customer.firstName }} {{ customer.lastName }}</p>
              <p class="text-sm text-gray-500">Phone: {{ customer.phoneNumber }} | Email: {{ customer.email }}</p>
            </div>
            <div class="mt-2 sm:mt-0 flex gap-2">
              <button class="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-blue-900" @click="viewCustomer(customer)">View</button>
              <button class="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" @click="ignoreCustomer()">Ignore</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    suggestedCustomers: {
      id: string
      firstName: string
      lastName: string
      phoneNumber: string
      email: string
    }[],
    viewCustomer: (customer: any) => void
    ignoreCustomer: () => void
  }>()

  </script>
  