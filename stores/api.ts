import { defineStore } from "pinia";
import axios from "axios";
import type { Article } from "~/types/api";
import { useRuntimeConfig } from '#app';

export const useStore = defineStore("store", () => {
    // State
    const searchValue = ref<string>("korea");
    const articleList = ref<Article[]>([]);
    const category = ref<string>("");

    // Mutations
    const changeSearchValue = (payload: string) => {
        searchValue.value = payload;
    };

    // getters
    //--- CardComponent.vue file 의 computed 를 제거하고, store getters 에 생성
    const website = computed( () => {
        return articleList.value.map((article) => {
            article.url.split("https://").pop()?.split("/")[0];
        })
    });

    const logo = computed( () => {
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${ website.value }&size=16`
    } );

    // Actions
    const getNews = async () => {
        //--- .env file 에 API KEY 값을 저장 후 store 에서 해당 파일을 읽어서 사용
        const apiKey = useRuntimeConfig().public.api_key;

        const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category.value}&apiKey=${apiKey}`;

        try {
            articleList.value = await axios.get(API_URL).then((res) => {
                return res.data.articles;
            });
        } catch (error) {
            console.log(error);
        }
    };

    return { searchValue, category, articleList, changeSearchValue, logo, getNews };
});