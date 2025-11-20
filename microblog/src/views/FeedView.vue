<script setup lang="ts">
import { useBlogStore } from '../stores/blogStore';
import PostCard from '../components/PostCard.vue';

const store = useBlogStore();
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Свежие посты</h1>
    <PostCard
        v-for="post in store.posts"
        :key="post.id"
        :post="post"
    />
  </div>
</template>