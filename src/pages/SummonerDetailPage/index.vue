<script setup lang="ts">
import NavigationSection from "@/pages/SummonerDetailPage/components/NavigationSection/index.vue";
import opggSummnoerAPI from "@/scripts/api/opgg-summnoer";
import { ref } from "vue";
import ProfileSection from "@/pages/SummonerDetailPage/components/ProfileSection/index.vue";
import Divider from "@/components/Divider.vue";
import RankAndMatchSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/index.vue";

let previousTiers = ref(null);
let profile = ref({
  nickname: "",
  level: 1,
  profileBorderImageUrl:
    "https://opgg-static.akamaized.net/images/profile_icons/profileIcon1625.jpg",
  profileImageUrl: "https://www.op.gg/summoner/userName=Hide on Bush",
  rank: 1,
  rankPercentOfTop: 16,
});
let leagues = ref({});
let matchSummary: any = ref({});

opggSummnoerAPI.getSummoner("Hide on Bush").then(({ data }) => {
  console.log(data);
  previousTiers.value = data.summoner.previousTiers
    .map((previousTier: any) => {
      return {
        season: previousTier.season,
        tier: previousTier.tier,
      };
    })
    .sort((a: any, b: any) => {
      return a.season - b.season;
    });

  profile.value = {
    nickname: data.summoner.name,
    level: data.summoner.level,
    profileBorderImageUrl: data.summoner.profileBorderImageUrl,
    profileImageUrl: data.summoner.profileImageUrl,
    rank: data.summoner.ladderRank.rank,
    rankPercentOfTop: data.summoner.ladderRank.rankPercentOfTop,
  };

  leagues.value = data.summoner.leagues.map((league: any) => {
    return {
      hasResults: league?.hasResults,
      tierImageUrl: league?.tierRank?.imageUrl,
      rankType: league?.tierRank?.name,
      tier: league?.tierRank?.tier,
      division: league?.tierRank?.division,
      tierRankPoint: league?.tierRank?.tierRankPoint,
      winCount: league?.wins,
      loseCount: league?.losses,
    };
  });
});

opggSummnoerAPI.getMatches("Hide On Bush").then(({ data }) => {
  matchSummary.value = {
    ...data,
  };
  console.log(data);
});
</script>

<template>
  <NavigationSection />
  <ProfileSection
    :tags="previousTiers"
    :nickname="profile.nickname"
    :level="profile.level"
    :profile-border-image-url="profile.profileBorderImageUrl"
    :profile-image-url="profile.profileImageUrl"
    :rank="profile.rank"
    :rank-percent-of-top="profile.rankPercentOfTop"
  />
  <Divider></Divider>

  <RankAndMatchSection :leagues="leagues" :match-summary="matchSummary" />
</template>

<style scoped></style>
