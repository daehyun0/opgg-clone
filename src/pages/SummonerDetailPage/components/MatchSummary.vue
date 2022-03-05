<script setup lang="ts">
import MatchSummarySectionSummary from "@/pages/SummonerDetailPage/components/MatchSummarySectionSummary.vue";
import MatchSummarySectionChampions from "@/pages/SummonerDetailPage/components/MatchSummarySectionChampions.vue";
import MatchSummarySectionPositions from "@/pages/SummonerDetailPage/components/MatchSummarySectionPositions.vue";
import Colors from "@/scripts/colors";

const props = defineProps<{
  matchSummary: {
    games: any[];
    champions: any[];
    positions: any[];
    summary: {
      wins: number;
      losses: number;
      kills: number;
      deaths: number;
      assists: number;
    };
  };
}>();
</script>

<template>
  <div class="match-summary-root">
    <MatchSummarySectionSummary
      class="summary"
      :raw-game-summary="matchSummary.summary"
    />
    <MatchSummarySectionChampions
      class="champions"
      :raw-champions="matchSummary.champions"
    />
    <MatchSummarySectionPositions
      class="positions"
      :raw-positions="matchSummary.positions"
    ></MatchSummarySectionPositions>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-root {
  @include flexRow(flex-start, flex-start);

  & > .summary {
    flex: 1 1 40.1%;
  }

  & > .champions {
    flex: 1 1 33.13%;
  }

  & > .summary + .champions {
    border-left: solid 1px v-bind("colors.silverThree");
  }

  & > .positions {
    flex: 1 1 26.74%;
  }

  & > .champions + .positions {
    border-left: solid 1px v-bind("colors.silverThree");
  }
}
</style>
