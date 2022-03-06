<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import kda from "@/scripts/domain/kda";
import Colors from "@/scripts/colors";
import MatchSummaryGraph from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryGraph.vue";
import KdaRatioStringWithHighlight from "@/pages/SummonerDetailPage/components/KdaRatioStringWithHighlight.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const summonerDetailPageStore = useSummonerDetailPageStore();
const gameSummary: ComputedRef<{
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
}> = computed(() => summonerDetailPageStore.matchSummary.summary);

const gameSummaryMapped = computed(() => {
  if (!gameSummary) {
    return {};
  }

  return {
    winCount: gameSummary.value.wins,
    loseCount: gameSummary.value.losses,
    matchCount: gameSummary.value.wins + gameSummary.value.losses,
    kills: kda.getKdaSingleFormatted(gameSummary.value.kills),
    deaths: kda.getKdaSingleFormatted(gameSummary.value.deaths),
    assists: kda.getKdaSingleFormatted(gameSummary.value.assists),
    kdaAverage: Number(
      kda.getKdaAverage(
        gameSummary.value.kills,
        gameSummary.value.deaths,
        gameSummary.value.assists
      )
    ),
  };
});
</script>

<template>
  <div class="match-summary-section-summary-root">
    <div class="win-count">
      {{ gameSummaryMapped.matchCount }}전 {{ gameSummaryMapped.winCount }}승
      {{ gameSummaryMapped.loseCount }}패
    </div>
    <div class="info">
      <div class="graph">
        <MatchSummaryGraph
          :win-count="gameSummaryMapped.winCount"
          :lose-count="gameSummaryMapped.loseCount"
        ></MatchSummaryGraph>
      </div>
      <div class="kda">
        <div class="value">
          <span class="kill">{{ gameSummaryMapped.kills }}</span>
          /
          <span class="death">{{ gameSummaryMapped.deaths }}</span>
          /
          <span class="assist">{{ gameSummaryMapped.assists }}</span>
        </div>
        <div class="average">
          <KdaRatioStringWithHighlight
            class="value"
            :value="gameSummaryMapped.kdaAverage"
            append-string=":1"
          />
          <span class="percent"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-section-summary-root {
  padding: 16px 35px 23px 24px;

  & > .win-count {
    font-size: 12px;
    color: v-bind("Colors.brownishGreyTwo");
  }

  & > .info {
    @include flexRow(space-between, center);

    & > .graph {
      width: 90px;
      height: 90px;
    }

    & > .kda {
      & > .value {
        font-size: 11px;
        font-weight: bold;
        text-align: center;
        color: v-bind("Colors.black");

        & > .death {
          color: v-bind("Colors.reddish");
        }
      }

      & > .average {
        text-align: center;
        font-size: 16px;
        color: v-bind("Colors.greyishBrown");

        & > .value {
          font-weight: bold;
        }
      }

      & > .value + .average {
        margin-top: 6px;
      }
    }
  }

  & > .win-count + .info {
    margin-top: 14px;
  }
}
</style>
