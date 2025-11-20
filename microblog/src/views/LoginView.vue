<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userApi } from '../api/userApi';

const router = useRouter();

const login = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const success = await userApi.login(login.value, password.value);

    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin/create-post');
    } else {
      errorMessage.value = 'Неверный логин или пароль';
    }
  } catch (e) {
    errorMessage.value = 'Ошибка сервера';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
      <div class="text-center lg:text-left mb-6">
        <h1 class="text-5xl font-bold">Вход в систему</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div v-if="errorMessage" class="alert alert-error text-sm py-2 mb-2">
            {{ errorMessage }}
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text">Логин</span></label>
            <input v-model="login" type="text" placeholder="admin" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text">Пароль</span></label>
            <input v-model="password" type="password" placeholder="123" class="input input-bordered" />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="handleLogin" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner"></span>
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>