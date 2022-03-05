<script setup lang="ts">
import { computed } from "vue";
import winRate from "@/scripts/domain/winRate";
import Colors from "@/scripts/colors";

const props = withDefaults(
  defineProps<{
    championsWinRateInfos: Array<{
      championName: string;
      championImageUrl: string;
      winCount: number;
      loseCount: number;
    }>;
  }>(),
  {
    championsWinRateInfos: () => [],
  }
);

const mostChampionInRankInfos = computed(() => {
  return props.championsWinRateInfos.map((championsWinRateInfo: any) => {
    return {
      ...championsWinRateInfo,
      winRatePercent: winRate.getWinRatePercent(
        championsWinRateInfo.winCount,
        championsWinRateInfo.loseCount
      ),
      winRateFormatted: winRate.getWinRateFormatted(
        championsWinRateInfo.winCount,
        championsWinRateInfo.loseCount
      ),
    };
  });
});
</script>

<template>
  <div
    class="weekly-rank-win-rate-table-root"
    v-for="mostChampionInRankInfo in mostChampionInRankInfos"
    :key="mostChampionInRankInfo.championName"
  >
    <img
      class="champion-image"
      :src="mostChampionInRankInfo.championImageUrl"
    />
    <div class="info">
      <div class="champion-name">{{ mostChampionInRankInfo.championName }}</div>
      <div class="win-rate">
        {{ mostChampionInRankInfo.winRateFormatted }}
      </div>
      <div class="graph">
        <div
          class="win"
          :style="{ flex: `1 0 ${mostChampionInRankInfo.winRatePercent}%` }"
        >
          {{ mostChampionInRankInfo.winCount }}승
        </div>
        <div
          class="lose"
          :style="{
            flex: `1 1 ${100 - mostChampionInRankInfo.winRatePercent}%`,
          }"
        >
          {{ mostChampionInRankInfo.loseCount }}패
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.weekly-rank-win-rate-table-root {
  padding: 7px 14px;
  @include flexRow(flex-start, center);

  & > .champion-image {
    flex: 0 0 32px;
    height: 32px;
    @include borderRad(50%);
  }

  & > .info {
    flex: 1 1 100%;
    @include flexRow(space-between, center);
    font-weight: bold;

    & > .champion-name {
      flex: 0 0 60px;
      font-size: 13px;
      color: v-bind("Colors.brownishGrey");
    }

    & > .win-rate {
      font-size: 13px;
      color: v-bind("Colors.coolGrey");
    }

    & > .graph {
      @include flexRow(flex-start, center);
      font-size: 12px;
      font-weight: bold;
      color: v-bind("Colors.whiteTwo");
      @include borderRad(4px);
      flex: 0 0 123px;
      height: 24px;
      overflow: hidden;

      & > .win {
        background-color: v-bind("Colors.bluish");
        height: 100%;
        @include flexRow(flex-start, center);
        padding-left: 4px;
      }

      & > .lose {
        background-color: v-bind("Colors.coral");
        height: 100%;
        @include flexRow(flex-end, center);
        padding-right: 4px;
      }
    }

    & > .win-rate + .graph {
      margin-left: 12px;
    }
  }

  & > .champion-image + .info {
    margin-left: 10px;
  }

  & + .weekly-rank-win-rate-table-root {
    border-top: solid 1px v-bind("Colors.silverThree");
  }
}
</style>
