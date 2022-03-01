<template>
  <section class="summoner-search-input-root">
    <div class="container">
      <input
        type="text"
        class="input-summoner-name"
        placeholder="소환사명,챔피언…"
      />
      <button class="search">
        <img src="~@/assets/icon-gg.svg" alt="gg-logo" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import colors from "@/scripts/colors";
</script>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.summoner-search-input-root {
  height: 32px;

  & > .container {
    background-color: v-bind("colors.whiteTwo");
    @include flexRow(space-between, center);
    @include borderRad(2px);

    & > .input-summoner-name {
      height: 100%;
      box-sizing: border-box;
      padding: 9px 14px 8px;
      color: v-bind("colors.warmGrey");
      font-size: 12px;
      flex: 1 0 auto;
    }

    & > .search {
      background-color: transparent;

      & > img {
        padding: 9px 10px;
        height: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
