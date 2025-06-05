<template>
    <header class="header">최근 뉴스 한 눈에 살펴보기</header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
    //--- Sass @include지시어는 믹스인을 사용(include)할 수 있도록 만들어졌습니다.
    @include flex-center;
    width: 100%;

    margin-top: 100px;

    font-size: 40px;
    font-weight: 700;
}
</style>