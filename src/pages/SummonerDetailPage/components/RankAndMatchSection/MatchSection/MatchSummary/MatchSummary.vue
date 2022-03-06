<script setup lang="ts">
import MatchSummaryStatsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryStatsSection.vue";
import MatchSummaryChampionsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryChampionsSection.vue";
import MatchSummaryPositionsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryPositionsSection.vue";
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
    <MatchSummaryStatsSection
      class="summary"
      :raw-game-summary="matchSummary.summary"
    />
    <MatchSummaryChampionsSection
      class="champions"
      :raw-champions="matchSummary.champions"
    />
    <MatchSummaryPositionsSection
      class="positions"
      :raw-positions="matchSummary.positions"
    ></MatchSummaryPositionsSection>
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
    border-left: solid 1px v-bind("Colors.silverThree");
  }

  & > .positions {
    flex: 1 1 26.74%;
  }

  & > .champions + .positions {
    border-left: solid 1px v-bind("Colors.silverThree");
  }
}
</style>
