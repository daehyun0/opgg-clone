<script setup lang="ts">
import Card from "@/components/common/Card.vue";
import RankCard from "@/pages/SummonerDetailPage/components/RankCard.vue";

defineProps<{
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
}>();
</script>

<template>
  <section class="section-rank-root">
    <RankCard
      class="rank-card"
      v-for="league of leagues"
      :key="league.rankType"
      :has-results="league.hasResults"
      :rank-type="league.rankType"
      :tier="league.tier"
      :tier-image-url="league.tierImageUrl"
      :division="league.division"
      :tier-rank-point="league.tierRankPoint"
      :win-count="league.winCount"
      :lose-count="league.loseCount"
    ></RankCard>
  </section>
</template>

<style scoped lang="scss">
.section-rank-root {
  & > .rank-card + .rank-card {
    margin-top: 8px;
  }
}
</style>
