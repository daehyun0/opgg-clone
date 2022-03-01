<script setup lang="ts">

import SummonerSearchInput from "./SummonerSearchInput.vue";
</script>

<template>
  <nav class="navigation-section-root">
    <section class="menu-list empty"></section>
    <SummonerSearchInput class="summoner-search-input"/>
  </nav>
</template>

<style scoped lang="scss">
.navigation-section-root {
  background-color: #1ea1f7;
  height: 97px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > .summoner-search-input {
    padding: 12px 0;
  }
}
</style>