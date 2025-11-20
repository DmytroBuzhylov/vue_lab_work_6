<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col p-4">
    <TheHeader />
    <main class="flex-1 container mx-auto">
      <RouterView />
    </main>

    <footer class="footer footer-center p-4 bg-base-300 text-base-content rounded-box mt-10">
      <aside>
        <p>Copyright © 2025 - Lab 5 Microblog</p>
      </aside>
    </footer>
  </div>
</template>