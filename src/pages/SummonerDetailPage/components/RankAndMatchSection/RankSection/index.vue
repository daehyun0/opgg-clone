<script setup lang="ts">
import Card from "@/components/Card.vue";
import RankCard from "@/pages/SummonerDetailPage/components/RankAndMatchSection/RankSection/RankCard.vue";
import WinRateTables from "@/pages/SummonerDetailPage/components/RankAndMatchSection/RankSection/WinRateTables.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";
import { computed } from "vue";

const summonerDetailPageStore = useSummonerDetailPageStore();

const leagues = computed(() => summonerDetailPageStore.$state.leagues);
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

    <WinRateTables class="win-rate-table"/>
  </section>
</template>

<style scoped lang="scss">
.section-rank-root {
  & > .rank-card + .rank-card {
    margin-top: 8px;
  }

  & > .rank-card + .win-rate-table {
    margin-top: 8px;
  }
}
</style>
