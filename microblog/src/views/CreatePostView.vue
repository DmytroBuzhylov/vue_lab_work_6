<script setup lang="ts">
import { ref } from 'vue';
import { useBlogStore, type PostType } from '../stores/blogStore';
import { useRouter } from 'vue-router';

const store = useBlogStore();
const router = useRouter();

const form = ref({
  authorId: '',
  title: '',
  body: '',
  type: 'Games' as PostType
});

const submit = () => {
  if (!form.value.authorId || !form.value.title) return;
  store.addPost(form.value);
  router.push('/');
};
</script>

<template>
  <div class="max-w-lg mx-auto bg-base-200 p-8 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Новый пост</h2>

    <div class="form-control w-full mb-4">
      <label class="label"><span class="label-text">Автор</span></label>
      <select class="select select-bordered" v-model="form.authorId">
        <option disabled value="">Выберите автора</option>
        <option v-for="a in store.authors" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
    </div>

    <div class="form-control w-full mb-4">
      <label class="label"><span class="label-text">Заголовок</span></label>
      <input type="text" placeholder="О чем пост?" class="input input-bordered" v-model="form.title" />
    </div>

    <div class="form-control w-full mb-4">
      <label class="label"><span class="label-text">Тип</span></label>
      <select class="select select-bordered" v-model="form.type">
        <option>Games</option>
        <option>Sports</option>
        <option>Study</option>
        <option>Other</option>
      </select>
    </div>

    <div class="form-control w-full mb-6">
      <label class="label"><span class="label-text">Текст</span></label>
      <textarea class="textarea textarea-bordered h-24" placeholder="Содержимое..." v-model="form.body"></textarea>
    </div>

    <button class="btn btn-primary w-full" @click="submit">Опубликовать</button>
  </div>
</template>