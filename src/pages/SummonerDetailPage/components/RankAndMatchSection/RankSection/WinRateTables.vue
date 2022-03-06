<script setup lang="ts">
import Colors from "@/scripts/colors";
import Tabs from "@/components/Tab.vue";
import { computed, ref } from "vue";
import ChampionWinRateTable from "@/pages/SummonerDetailPage/components/RankAndMatchSection/RankSection/ChampionWinRateTable.vue";
import WeeklyRankWinRateTable from "@/pages/SummonerDetailPage/components/RankAndMatchSection/RankSection/WeeklyRankWinRateTable.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const summonerDetailPageStore = useSummonerDetailPageStore();

let tabKey = ref("most-champion");
let champions = computed(() => summonerDetailPageStore.champions);
let recentWinRates = computed(() => summonerDetailPageStore.recentWinRates);

const isTabChampionWinRate = computed(() => tabKey.value === "most-champion");
const isTabWeeklyRankWinRate = computed(() => tabKey.value === "weekly-rank");

const handleChangeTab = (newTabKey: string) => {
  tabKey.value = newTabKey;
};
</script>

<template>
  <div class="win-rate-tabs-root">
    <Tabs
      class="tabs"
      :options="[
        { key: 'most-champion', title: '챔피언 승률' },
        { key: 'weekly-rank', title: '7일간 랭크 승률' },
      ]"
      name="win-rate"
      :selected-key="tabKey"
      @select="handleChangeTab"
    />

    <ChampionWinRateTable
      v-if="isTabChampionWinRate"
      :most-champion-win-rate-infos="champions"
    />

    <WeeklyRankWinRateTable
      v-else-if="isTabWeeklyRankWinRate"
      :champions-win-rate-infos="recentWinRates"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.win-rate-tabs-root {
  @include border-solid-1(v-bind("Colors.silverThree"));

  &:deep(.tabs) {
    background-color: v-bind("Colors.whiteFive");

    & > input + label {
      flex: 0 0 50%;
      padding: 14px 14px 13px;
      box-sizing: border-box;
      font-size: 12px;
      text-align: center;
      color: v-bind("Colors.coolGrey");
      border-bottom: solid 1px v-bind("Colors.silverThree");
    }

    & > input:checked + label {
      background-color: v-bind("Colors.whiteFour");
      border-bottom: none;
      color: v-bind("Colors.brownishGrey");
      font-weight: bold;
    }

    & > label ~ label {
      border-left: solid 1px v-bind("Colors.silverThree");
    }
  }
}
</style>
