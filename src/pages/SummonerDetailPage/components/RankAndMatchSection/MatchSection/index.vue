<script setup lang="ts">
import MatchSummaryByRankType from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryByRankType.vue";
import MatchDetail from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetail.vue";
</script>

<template>
  <section class="match-section-root">
    <MatchSummaryByRankType class="match-summary"/>
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