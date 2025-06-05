<template>
    <div class="page">
        <!-- store 사용하지 않고, 해당 페이지에서 사용할 때 -->
        <!-- <CardComponent v-for="article in data?.articles" :key="article.url" :data="article" /> -->

        <!-- store 사용 -->
        <CardComponent v-for="article in store.articleList" :key="article.url" :data="article" :logo="logo" />
    </div>
</template>

<script setup lang="ts">

//--- 페이지 내에서 직접 호출하는 경우
// import CardComponent from "./components/CardComponent.vue";
// import type { ApiStructure } from "~/types/api";

// const searchValue = ref<string>("korea");

// const API_KEY = "28028d2c67c343a9a69473a6597b428c";
// const API_URL = `https://newsapi.org/v2/everything?q=${searchValue.value}&from=2025-06-01&sortBy=popularity&apiKey=${API_KEY}`;
// const { data, pending, error, refresh } = await useAsyncData<ApiStructure>("getNews", () => $fetch(API_URL));
// console.log("data ::::: ", data);

//--- store 활용하는 경우
import CardComponent from "./components/CardComponent.vue";
import { useStore } from "~/stores/api";

const store = useStore();
const { logo } = storeToRefs(store);

await useAsyncData("getNews", () => store.getNews());
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;

    width: calc(100% - 96px);

    padding: 48px;
    gap: 24px;
}
</style>