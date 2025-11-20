<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthors } from '../composables/useAuthors';

const { createAuthor, isLoading } = useAuthors();
const router = useRouter();

const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Zizo',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Robot',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Snuggles',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight',
];

const name = ref('');
const selectedAvatar = ref(avatars[0] || '');

const submit = async () => {
  if (!name.value.trim()) {
    alert('Введите имя!');
    return;
  }

  const newId = await createAuthor(name.value, selectedAvatar.value);

  if (newId) {
    router.push(`/author/${newId}`);
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="card bg-base-200 w-full max-w-2xl shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-3xl justify-center mb-6">Создать профиль</h2>

        <div class="form-control w-full">
          <label class="label"><span class="label-text font-bold">Имя</span></label>
          <input v-model="name" type="text" placeholder="Ваше имя..." class="input input-bordered input-primary w-full" />
        </div>

        <div class="form-control mt-6">
          <label class="label"><span class="label-text font-bold">Аватар</span></label>
          <div class="carousel carousel-center bg-base-300 rounded-box p-4 space-x-4 cursor-pointer">
            <div
                v-for="(avatar, index) in avatars"
                :key="index"
                class="carousel-item"
                @click="selectedAvatar = avatar"
            >
              <div class="avatar transition-all hover:scale-110" :class="{ 'ring-4 ring-primary': selectedAvatar === avatar }">
                <div class="w-24 rounded-full bg-base-100">
                  <img :src="avatar" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end mt-8">
          <button class="btn btn-primary btn-lg w-full" @click="submit" :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-else>Создать и войти</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>