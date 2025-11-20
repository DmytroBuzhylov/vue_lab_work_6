<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore, type PostType } from '../stores/blogStore';
import PostCard from '../components/PostCard.vue';

const route = useRoute();
const store = useBlogStore();
const authorId = route.params.id as string;

const author = computed(() => store.getAuthorById(authorId));
const posts = computed(() => store.getPostsByAuthorId(authorId));

const selectedType = ref<PostType | 'All'>('All');
const filteredPosts = computed(() => {
  if (selectedType.value === 'All') return posts.value;
  return posts.value.filter(p => p.type === selectedType.value);
});

const stats = computed(() => {
  const counts: Record<string, number> = {};
  posts.value.forEach(p => {
    counts[p.type] = (counts[p.type] || 0) + 1;
  });
  return counts;
});

const counterValue = ref(0);
onMounted(() => {
  setTimeout(() => {
    counterValue.value = posts.value.length;
  }, 500);
});
</script>

<template>
  <div v-if="author" class="max-w-4xl mx-auto">
    <div class="hero bg-base-200 rounded-2xl p-8 mb-8">
      <div class="hero-content flex-col lg:flex-row gap-10">
        <div class="avatar">
          <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
            <img :src="author.avatar" />
          </div>
        </div>
        <div>
          <h1 class="text-5xl font-bold">{{ author.name }}</h1>

          <div class="stats shadow mt-6 bg-base-100">
            <div class="stat">
              <div class="stat-title">Всего постов</div>
              <div class="stat-value text-primary">
                <span class="countdown font-mono text-5xl">
                  <span :style="`--value:${counterValue};`"></span>
                </span>
              </div>
            </div>

            <div class="stat" v-for="(count, type) in stats" :key="type">
              <div class="stat-title">{{ type }}</div>
              <div class="stat-value text-secondary text-3xl">{{ count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs tabs-boxed mb-6">
      <a class="tab" :class="{ 'tab-active': selectedType === 'All' }" @click="selectedType = 'All'">All</a>
      <a class="tab" :class="{ 'tab-active': selectedType === 'Games' }" @click="selectedType = 'Games'">Games</a>
      <a class="tab" :class="{ 'tab-active': selectedType === 'Sports' }" @click="selectedType = 'Sports'">Sports</a>
      <a class="tab" :class="{ 'tab-active': selectedType === 'Study' }" @click="selectedType = 'Study'">Study</a>
    </div>

    <div class="grid gap-4">
      <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>
  </div>

  <div v-else class="text-center text-error">Автор не найден</div>
</template>