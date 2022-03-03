<script setup lang="ts">
import MatchSummaryByRankType from "@/pages/SummonerDetailPage/components/MatchSummaryByRankType.vue";

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
  <MatchSummaryByRankType :match-summary="matchSummary"/>
</template>

<style scoped>

</style>