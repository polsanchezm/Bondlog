import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchPosts,
  fetchPostDetail,
  createPost,
  updatePost,
  deletePost,
  togglePin,
} from "@services/post";
import type { Post, Pagination, APIError } from "@lib/interfaces";

interface CachedPage {
  posts: Post[];
  pagination: Pagination;
  lastFetched: number;
}

interface CachedDetail {
  data: Post;
  lastFetched: number;
}

interface PostStore {
  // Datos de la lista (paginados)
  posts: Post[];
  pagination: Pagination | null;
  // Detalle del post actualmente cargado
  postDetail: Post | null;
  loading: boolean;
  error: APIError | null;
  // Cache para cada página
  cachedPages: { [page: number]: CachedPage };
  // Cache para cada detalle de post (por id)
  postDetailCache: { [id: string]: CachedDetail };

  // Métodos asíncronos
  loadPosts: (page?: number) => Promise<void>;
  loadPostDetail: (id: string) => Promise<void>;
  addPost: (postData: Post) => Promise<void>;
  editPost: (postData: Post, id: string) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  pinPost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      pagination: null,
      postDetail: null,
      loading: false,
      error: null,
      cachedPages: {},
      postDetailCache: {},

      loadPosts: async (page = 1) => {
        const now = Date.now();
        const cacheDuration = 10 * 60 * 1000; // 10 minutos en milisegundos
        const { cachedPages } = get();

        // Si ya existen datos para la página solicitada y están frescos, los usamos.
        if (
          cachedPages[page] &&
          now - cachedPages[page].lastFetched < cacheDuration
        ) {
          set({
            posts: cachedPages[page].posts,
            pagination: cachedPages[page].pagination,
            loading: false,
          });
          return;
        }

        set({ loading: true, error: null });
        const response = await fetchPosts(page);
        if (response.error) {
          set({ error: response.error, loading: false });
        } else {
          const cacheEntry: CachedPage = {
            posts: response.data,
            pagination: response.pagination,
            lastFetched: Date.now(),
          };
          set((state) => ({
            posts: response.data,
            pagination: response.pagination,
            loading: false,
            cachedPages: { ...state.cachedPages, [page]: cacheEntry },
          }));
        }
      },

      loadPostDetail: async (id: string) => {
        const now = Date.now();
        const cacheDuration = 10 * 60 * 1000; // 10 minutos
        const { postDetailCache } = get();

        // Si ya tenemos el detalle del post y la caché es válida, lo usamos.
        if (
          postDetailCache[id] &&
          now - postDetailCache[id].lastFetched < cacheDuration
        ) {
          set({ postDetail: postDetailCache[id].data });
          return;
        }

        set({ loading: true, error: null });
        const response = await fetchPostDetail(id);
        if (response.error) {
          set({ error: response.error, loading: false });
        } else {
          set((state) => ({
            postDetail: response.data,
            loading: false,
            postDetailCache: {
              ...state.postDetailCache,
              [id]: { data: response.data, lastFetched: Date.now() },
            },
          }));
        }
      },

      addPost: async (postData) => {
        set({ loading: true });
        const response = await createPost(postData);
        if (!response.error) {
          set((state) => ({
            posts: [response.data, ...state.posts],
            loading: false,
          }));
        } else {
          set({ error: response.error, loading: false });
        }
      },

      editPost: async (postData, id) => {
        set({ loading: true });
        const response = await updatePost(postData, id);
        if (!response.error) {
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? response.data : post
            ),
            loading: false,
          }));
          // Actualizamos el cache del detalle
          set((state) => ({
            postDetail: response.data,
            postDetailCache: {
              ...state.postDetailCache,
              [id]: { data: response.data, lastFetched: Date.now() },
            },
          }));
        } else {
          set({ error: response.error, loading: false });
        }
      },

      removePost: async (id) => {
        set({ loading: true });
        const response = await deletePost(id);
        if (!response.error) {
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
            loading: false,
          }));
          // Removemos de la caché el detalle si existe.
          set((state) => {
            const newCache = { ...state.postDetailCache };
            delete newCache[id];
            return { postDetailCache: newCache };
          });
        } else {
          set({ error: response.error, loading: false });
        }
      },

      pinPost: async (id) => {
        const response = await togglePin(id);
        if (!response.error) {
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, is_pinned: !post.is_pinned } : post
            ),
          }));
          // Actualizamos el detalle en caché si corresponde.
          set((state) => {
            if (state.postDetail && state.postDetail.id === id) {
              const updatedPost = {
                ...state.postDetail,
                is_pinned: !state.postDetail.is_pinned,
              };
              return {
                postDetail: updatedPost,
                postDetailCache: {
                  ...state.postDetailCache,
                  [id]: { data: updatedPost, lastFetched: Date.now() },
                },
              };
            }
            return {};
          });
        }
      },
    }),
    { name: "post-store" }
  )
);
