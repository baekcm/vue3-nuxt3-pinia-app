import { defineStore } from "pinia";
import axios from "axios";
import dayjs from "dayjs";
import type { Article } from "~/types/api";
import { useRuntimeConfig } from '#app';

export const useStore = defineStore("store", () => {
    // State
    const searchValue = ref<string>("general");
    const articleList = ref<Article[]>([]);
    const category = ref<string>("general");

    // Mutations
    const changeSearchValue = (payload: string) => {
        searchValue.value = payload;
    };

    // getters

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

    return { searchValue, category, articleList, changeSearchValue, getNews };
});