<script setup lang="ts">
import { computed, defineProps } from "vue";
import kda from "@/scripts/domain/kda";
import Colors from "@/scripts/colors";
import MatchSummaryGraph from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryGraph.vue";
import KdaRatioStringWithHighlight from "@/pages/SummonerDetailPage/components/KdaRatioStringWithHighlight.vue";

const props = defineProps<{
  rawGameSummary: any;
}>();

const lastGamesSummary = computed(() => {
  if (!props.rawGameSummary) {
    return {};
  }

  return {
    winCount: props.rawGameSummary.wins,
    loseCount: props.rawGameSummary.losses,
    matchCount: props.rawGameSummary.wins + props.rawGameSummary.losses,
    kills: kda.getKdaSingleFormatted(props.rawGameSummary.kills),
    deaths: kda.getKdaSingleFormatted(props.rawGameSummary.deaths),
    assists: kda.getKdaSingleFormatted(props.rawGameSummary.assists),
    kdaAverage: kda.getKdaAverage(
      props.rawGameSummary.kills,
      props.rawGameSummary.deaths,
      props.rawGameSummary.assists
    ),
  };
});
</script>

<template>
  <div class="match-summary-section-summary-root">
    <div class="win-count">
      {{ lastGamesSummary.matchCount }}전 {{ lastGamesSummary.winCount }}승
      {{ lastGamesSummary.loseCount }}패
    </div>
    <div class="info">
      <div class="graph">
        <MatchSummaryGraph
          :win-count="lastGamesSummary.winCount"
          :lose-count="lastGamesSummary.loseCount"
        ></MatchSummaryGraph>
      </div>
      <div class="kda">
        <div class="value">
          <span class="kill">{{ lastGamesSummary.kills }}</span>
          /
          <span class="death">{{ lastGamesSummary.deaths }}</span>
          /
          <span class="assist">{{ lastGamesSummary.assists }}</span>
        </div>
        <div class="average">
          <KdaRatioStringWithHighlight
            class="value"
            :value="lastGamesSummary.kdaAverage"
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
      }

      & > .average {
        text-align: center;
        font-size: 16px;
        color: v-bind("Colors.greyishBrown");
      }

      & > .value + .average {
        margin-top: 6px;
      }
    }

    & > .graph + .kda {
    }
  }

  & > .win-count + .info {
    margin-top: 14px;
  }
}
</style>
