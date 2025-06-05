<template>
    <nav class="nav">
        <!-- 방법01: 템플릿 참조 ref 를 활용하는 방법 -->
        <div class="nav__list">
            <NuxtLink :to="item.path" v-for="item in navItems" class="nav__list__item" :key="item.idx" :class="{ active: item.isClicked }">
                {{ item.label }}
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import type { Nav } from "../types/nav";

const route = useRoute();
const navItems = ref<Nav[]>([
    {
        idx: 0,
        label: "일반시사",
        value: "General",
        path: "general",
        isClicked: true,
    },
    {
        idx: 1,
        label: "비즈니스",
        value: "business",
        path: "business",
        isClicked: false,
    },
    {
        idx: 2,
        label: "엔터테인먼트",
        value: "entertainment",
        path: "entertainment",
        isClicked: false,
    },
    {
        idx: 3,
        label: "건강",
        value: "health",
        path: "health",
        isClicked: false,
    },
    {
        idx: 4,
        label: "과학",
        value: "science",
        path: "science",
        isClicked: false,
    },
    {
        idx: 5,
        label: "스포츠",
        value: "sports",
        path: "sports",
        isClicked: false,
    },
    {
        idx: 6,
        label: "테크놀리지",
        value: "technology",
        path: "technology",
        isClicked: false,
    },
]);

watch(
    () => route.params.id,
    () => {
        navItems.value.forEach((item: Nav) => {
            item.isClicked = false;

            if (route.params.id === item.path) item.isClicked = true;
        });
    }
);
</script>

<style lang="scss" scoped>
.nav {
    @include flex-center;
    width: 100%;

    margin-top: 88px;

    &__list {
        @include flex-center;
        list-style: none;

        width: 100%;

        gap: 24px;

        &__item {
            @include flex-center;

            padding: 6px 12px;

            background-color: $color-gray-200;
            border-radius: 20px;
            text-decoration: none;
            color: $color-black-700;

            cursor: pointer;

            &.active {
                background-color: #494949;
                color: $color-white-000;
            }
        }
    }
}
</style>