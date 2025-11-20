import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Author {
    id: string;
    name: string;
    avatar: string;
}

export interface Post {
    id: string;
    authorId: string;
    title: string;
    body: string;
    type: PostType;
}

export type PostType = 'Games' | 'Sports' | 'Study' | 'Other';

export const postTypeColors: Record<PostType, string> = {
    Games: 'badge-primary',
    Sports: 'badge-secondary',
    Study: 'badge-accent',
    Other: 'badge-ghost'
};

export const useBlogStore = defineStore('blog', () => {
    const authors = ref<Author[]>([]);
    const posts = ref<Post[]>([]);

    const setAuthors = (newAuthors: Author[]) => {
        authors.value = newAuthors;
    };

    const addAuthor = (author: Author) => {
        authors.value.push(author);
    };

    const setPosts = (newPosts: Post[]) => {
        posts.value = newPosts;
    };

    const addPost = (post: Post) => {
        posts.value.push(post);
    };

    const getAuthorById = (id: string) => authors.value.find(a => a.id === id);

    const getPostsByAuthorId = (authorId: string) =>
        posts.value.filter(p => p.authorId === authorId);

    return {
        authors,
        posts,
        setAuthors,
        addAuthor,
        setPosts,
        addPost,
        getAuthorById,
        getPostsByAuthorId
    };
});