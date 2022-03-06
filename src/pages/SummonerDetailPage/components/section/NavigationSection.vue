<script setup lang="ts">
import StyleConstants from "@/scripts/styleConstants";
import SummonerSearchInput from "@/components/SummonerSearchInput.vue";
</script>

<template>
  <nav class="navigation-section-root">
    <section class="top-section"></section>
    <section class="bottom-section">
      <section class="menu-list empty"></section>
      <SummonerSearchInput class="summoner-search-input"/>
    </section>
  </nav>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.navigation-section-root {
  background-color: #1ea1f7;

  & > .top-section {
    // 컨텐츠가 없어서 너비값 추가
    height: 41px;
  }

  & > .bottom-section {
    max-width: v-bind("StyleConstants.maxWidth");
    margin: 0 auto;
    width: 100%;
    @include flexRow(space-between, flex-end);

    & > .menu-list {
      // 컨텐츠가 없어서 너비값 추가
      flex: 1 1 100%;
    }

    & > .summoner-search-input {
      flex: 1 0 280px;
      margin-left: 24px;
      padding: 12px 0;
    }
  }
}
</style>