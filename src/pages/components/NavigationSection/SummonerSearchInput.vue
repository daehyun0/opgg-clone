<script setup lang="ts">
import Colors from "@/scripts/colors";
import HistoryWindow from "./HistoryWindow.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Route from "@/scripts/domain/route";

const router = useRouter();

const isShowHistory = ref(false);
const isShowPreSearch = ref(false);
const inputSummonerName = ref("");

const showHistory = () => {
  isShowHistory.value = true;
  isShowPreSearch.value = false;
};

const showPreSearch = () => {
  isShowHistory.value = false;
  isShowPreSearch.value = true;
};

const decideFloatingWindow = (inputValue: string) => {
  if (!inputValue) {
    showHistory();
    return;
  }
  showPreSearch();
};

const handleFocusInput = (e: { target: HTMLInputElement }) => {
  decideFloatingWindow(e.target.value);
};

const handleInputSummonerNameInput = (e: { target: HTMLInputElement }) => {
  decideFloatingWindow(e.target.value);
  inputSummonerName.value = e.target.value;
};

const moveToSummonerDetailRoute = () => {
  router.push(Route.getSummonerDetailRoute(inputSummonerName.value).path);
};

const handleClickSearchButton = () => {
  moveToSummonerDetailRoute();
};

const handleEnterSummonerNameInput = () => {
  moveToSummonerDetailRoute();
};
</script>

<template>
  <section class="summoner-search-input-root">
    <div class="container">
      <input
        type="text"
        class="input-summoner-name"
        placeholder="소환사명,챔피언…"
        @focus="handleFocusInput"
        @input="handleInputSummonerNameInput"
        @keyup.enter="handleEnterSummonerNameInput"
      />
      <button class="search" @click="handleClickSearchButton">
        <img src="~@/assets/images/icon-gg.svg" alt="gg-logo" />
      </button>
    </div>

    <HistoryWindow v-show="isShowHistory" class="history-window" />
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.summoner-search-input-root {
  height: 32px;
  position: relative;

  & > .container {
    background-color: v-bind("Colors.whiteTwo");
    @include flexRow(space-between, center);
    @include borderRad(2px);

    & > .input-summoner-name {
      height: 100%;
      box-sizing: border-box;
      padding: 9px 14px 8px;
      color: v-bind("Colors.warmGrey");
      font-size: 12px;
      flex: 1 0 auto;
    }

    & > .search {
      background-color: transparent;
      cursor: pointer;

      & > img {
        padding: 9px 10px;
        height: 14px;
        vertical-align: middle;
      }
    }
  }

  & > .history-window {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: calc(100% - 4px);
    left: 0;
  }
}
</style>
