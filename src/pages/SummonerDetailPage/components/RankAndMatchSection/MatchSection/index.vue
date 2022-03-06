<script setup lang="ts">
import MatchSummaryByRankType from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryByRankType.vue";
import MatchDetail from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetail.vue";

defineProps<{
  matchSummary: {
    games: any[];
    champions: any[];
    positions: any[];
    summary: object;
  }
}>()
</script>

<template>
  <section class="match-section-root">
    <MatchSummaryByRankType class="match-summary" :match-summary="matchSummary"/>
    <MatchDetail class="match-detail"/>
  </section>
</template>

<style scoped lang="scss">
.match-section-root {
  & > .match-summary + .match-detail {
    margin-top: 16px;
  }
}

</style>