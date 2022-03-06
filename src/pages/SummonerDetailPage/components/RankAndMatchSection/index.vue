<script setup lang="ts">
import RankSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/RankSection/index.vue";
import MatchSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/index.vue";

const props = defineProps<{
  leagues: Array<{
    hasResults: boolean;
    tierImageUrl: string;
    rankType: string;
    tier: string;
    division: string;
    tierRankPoint: number;
    winCount: number;
    loseCount: number;
  }>;
  matchSummary: {
    games: any[];
    champions: any[];
    positions: any[];
    summary: object;
  };
}>();
</script>

<template>
  <section class="section-rank-and-match-root">
    <div class="rank-and-match-container">
      <RankSection class="rank-section" :leagues="leagues" />
      <MatchSection class="match-section" :match-summary="matchSummary" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.section-rank-and-match-root {
  padding: 10px 0;
  max-width: 1000px;
  margin: 0 auto;

  & > .rank-and-match-container {
    @include flexRow(flex-start, flex-start);

    & > .rank-section {
      flex: 0 0 300px;
    }

    & > .match-section {
      flex: 0 0 690px;
    }

    & > .rank-section + .match-section {
      margin-left: 10px;
    }
  }
}
</style>
