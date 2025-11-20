<script setup lang="ts">
import { computed } from 'vue';
import { type Post, type Author, postTypeColors, useBlogStore } from '../stores/blogStore';
import { useRouter } from 'vue-router';

const props = defineProps<{
  post: Post
}>();

const store = useBlogStore();
const router = useRouter();

const author = computed(() => store.getAuthorById(props.post.authorId));
const badgeColor = computed(() => postTypeColors[props.post.type] || 'badge-ghost');

const goToProfile = () => {
  if (author.value) {
    router.push(`/author/${author.value.id}`);
  }
};
</script>

<template>
  <div class="card bg-base-200 shadow-xl mb-4 hover:shadow-2xl transition-all duration-300">
    <div class="card-body">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="card-title text-2xl font-bold mb-1">{{ post.title }}</h2>
          <div class="h-1 w-20 bg-primary rounded mb-2"></div>
        </div>

        <div
            v-if="author"
            @click="goToProfile"
            class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div class="text-right">
            <p class="font-bold text-lg leading-none">{{ author.name }}</p>
          </div>

          <div class="indicator">
            <span class="indicator-item badge" :class="badgeColor">{{ post.type }}</span>
            <div class="avatar">
              <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="author.avatar" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 text-base-content/80 text-lg">{{ post.body }}</p>
    </div>
  </div>
</template>