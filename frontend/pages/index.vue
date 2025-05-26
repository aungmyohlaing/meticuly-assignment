<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div class="flex justify-center mb-6">
        <img src="/images/Meticuly-logo.avif" alt="Logo" class="h-16 w-72" />
      </div>
      <h1 class="mb-6 text-center text-2xl font-bold text-gray-700">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>          
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch<{ token: string }>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',      
      body: { email: email.value, password: password.value },
    })

    // Set cookie with 2 hour expiration (matching backend JWT expiration)
    const token = useCookie('auth_token', {
      maxAge: 7200, // 2 hours in seconds
      path: '/',
      secure: true,
      sameSite: 'strict'
    })
    token.value = response.token

    router.push('/dashboard')
  } catch (error: any) {
    errorMessage.value = error?.data?.message || 'Login failed. Please try again.'
  }
}
</script>
