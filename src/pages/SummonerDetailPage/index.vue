<script setup lang="ts">
import NavigationSection from "@/pages/components/NavigationSection/index.vue";
import { ref } from "vue";
import ProfileSection from "@/pages/SummonerDetailPage/components/ProfileSection/index.vue";
import Divider from "@/components/Divider.vue";
import RankAndMatchSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/index.vue";
import { useRoute } from "vue-router";
import History from "@/scripts/domain/history";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const route = useRoute();
const summonerName: string = route.params.summonerName as string;
History.addHistory(summonerName);

const summonerDetailPageStore = useSummonerDetailPageStore();
summonerDetailPageStore.$reset();

summonerDetailPageStore.fetchMatches(summonerName);
summonerDetailPageStore.fetchMostInfo(summonerName);
summonerDetailPageStore.fetchSummoners(summonerName);
</script>

<template>
  <NavigationSection />
  <ProfileSection/>
  <Divider></Divider>

  <RankAndMatchSection/>
</template>

<style scoped></style>
