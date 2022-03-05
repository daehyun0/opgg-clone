<script setup lang="ts">
import Colors from "@/scripts/colors";
import Tabs from "@/components/common/Tab.vue";
import { computed, defineProps, ref } from "vue";
import ChampionWinRateTable from "@/pages/SummonerDetailPage/components/ChampionWinRateTable.vue";
import WeeklyRankWinRateTable from "@/pages/SummonerDetailPage/components/WeeklyRankWinRateTable.vue";

const props = withDefaults(
  defineProps<{
    mostChampionWinRateInfo: Array<{
      championName: string;
      cs: number;
      csPerMinute: number;
      winCount: number;
      loseCount: number;
      kill: number;
      death: number;
      assist: number;
      championImageUrl: string;
    }>;
  }>(),
  {
    mostChampionWinRateInfo: () => [
      {
        championName: "신지드",
        cs: 67.812,
        csPerMinute: 2.4,
        winCount: 21,
        loseCount: 14,
        kill: 4.3,
        death: 6.1,
        assist: 10.7,
        championImageUrl:
          "https://opgg-static.akamaized.net/images/lol/champion/Viktor.png",
      },
      {
        championName: "신지드",
        cs: 67.812,
        csPerMinute: 2.4,
        winCount: 21,
        loseCount: 14,
        kill: 4.3,
        death: 6.1,
        assist: 10.7,
        championImageUrl:
            "https://opgg-static.akamaized.net/images/lol/champion/Viktor.png",
      },
      {
        championName: "신지드",
        cs: 67.812,
        csPerMinute: 2.4,
        winCount: 21,
        loseCount: 14,
        kill: 4.3,
        death: 6.1,
        assist: 10.7,
        championImageUrl:
            "https://opgg-static.akamaized.net/images/lol/champion/Viktor.png",
      },
      {
        championName: "신지드",
        cs: 67.812,
        csPerMinute: 2.4,
        winCount: 21,
        loseCount: 14,
        kill: 4.3,
        death: 6.1,
        assist: 10.7,
        championImageUrl:
            "https://opgg-static.akamaized.net/images/lol/champion/Viktor.png",
      },
    ],
  }
);

let tabKey = ref("most-champion");

const isTabChampionWinRate = computed(() => tabKey.value === "most-champion");
const isTabWeeklyRankWinRate = computed(() => tabKey.value === "weekly-rank");

const handleChangeTab = (newTabKey: string) => {
  tabKey.value = newTabKey;
}
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
      :most-champion-win-rate-infos="mostChampionWinRateInfo"
    />

    <WeeklyRankWinRateTable v-else-if="isTabWeeklyRankWinRate" />
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
