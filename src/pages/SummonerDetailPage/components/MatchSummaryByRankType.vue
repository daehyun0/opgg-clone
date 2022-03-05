<script setup lang="ts">
import Colors from "@/scripts/colors";
import MatchSummaryTab from "@/pages/SummonerDetailPage/components/MatchSummaryTab.vue";
import MatchSummary from "@/pages/SummonerDetailPage/components/MatchSummary.vue";
import {computed} from "vue";

const props = defineProps<{
  matchSummary: {
    games: any[];
    champions: any[];
    positions: any[];
    summary: any;
  };
}>();

</script>

<template>
  <section class="match-summary-by-rank-type-root">
    <MatchSummaryTab :games="matchSummary.games" />
    <MatchSummary :match-summary="matchSummary" />
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-by-rank-type-root {
  @include border-solid-1(v-bind("colors.silverThree"));
}
</style>
