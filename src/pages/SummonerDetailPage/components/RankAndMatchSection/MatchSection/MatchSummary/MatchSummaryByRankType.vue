<script setup lang="ts">
import Colors from "@/scripts/colors";
import MatchSummaryTab from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryTab.vue";
import MatchSummary from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummary.vue";
</script>

<template>
  <section class="match-summary-by-rank-type-root">
    <MatchSummaryTab />
    <MatchSummary />
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-by-rank-type-root {
  @include border-solid-1(v-bind("Colors.silverThree"));
}
</style>
