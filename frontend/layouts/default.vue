<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-primary shadow">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto bg-white p-1 rounded-lg" src="/images/Meticuly-logo.avif" alt="Meticuly" />
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
const handleLogout = () => {
  const token = useCookie('auth_token', {
    path: '/',
    secure: true,
    sameSite: 'strict'
  })
  token.value = null
  navigateTo('/')
}
</script> 