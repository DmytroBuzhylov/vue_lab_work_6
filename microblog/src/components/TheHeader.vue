<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const currentTheme = ref('dark');
const isLoggedIn = ref(false);

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  localStorage.setItem('theme', currentTheme.value);
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn.value = false;
  router.push('/login');
};

router.afterEach(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
});

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-md mb-4 rounded-box">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">MicroBlog 📝</RouterLink>
    </div>
    <div class="flex-none gap-2">
      <ul class="menu menu-horizontal px-1">
        <li><RouterLink to="/">Лента</RouterLink></li>

        <li><RouterLink to="/admin/create-author">Создать Автора</RouterLink></li>
        <li><RouterLink to="/admin/create-post">Создать Пост</RouterLink></li>

        <li v-if="!isLoggedIn"><RouterLink to="/login" class="font-bold text-primary">Войти</RouterLink></li>
        <li v-else><button @click="logout" class="font-bold text-error">Выйти</button></li>
      </ul>

      <label class="swap swap-rotate btn btn-ghost btn-circle">
        <input type="checkbox" @change="toggleTheme" :checked="currentTheme === 'light'" />
        <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,4.95l-.71.71A1,1,0,0,0,5.64,7.05Zm13.01,1.46a1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,18.65,4.95l-.71.71A1,1,0,0,0,18.65,8.51Zm3.69,2.15a1,1,0,0,0-1,1H20a1,1,0,0,0,0,2h1.34A1,1,0,0,0,22.34,10.66ZM17,17a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V16a1,1,0,0,0-1-1H17A1,1,0,0,0,17,17Zm-5,4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V20a1,1,0,0,0-1-1H12A1,1,0,0,0,12,21Z"/></svg>
        <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/></svg>
      </label>
    </div>
  </div>
</template>