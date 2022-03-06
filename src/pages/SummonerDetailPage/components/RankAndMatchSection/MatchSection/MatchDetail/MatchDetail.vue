<script setup lang="ts">
import opggSummnoer from "@/scripts/api/opgg-summnoer";
import MatchDetailCard from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetailCard.vue";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useItemsStore } from "@/store/items";
import Tooltip from "@/components/Tooltip.vue";

const itemStore = useItemsStore();

const matches = ref({});
opggSummnoer.getMatches("Hide On Bush").then(async ({ data }) => {
  const matchDetailPromises = data.games.map((game: any) => {
    return opggSummnoer.getMatchDetail("Hide On Bush", game.gameId);
  });
  const matchDetails = await Promise.all(matchDetailPromises);

  matches.value = data.games.map((game: any) => {
    return {
      ...game,
      users: matchDetails
        .find(({ data: matchDetail }) => matchDetail.gameId === game.gameId)
        .data.teams.reduce(
          (
            acc: Array<{ summonerName: string; championImageUrl: string }>,
            team: any
          ) => {
            return acc.concat(
              team.players.map((player: any) => {
                return {
                  summonerName: player.summonerName,
                  championImageUrl: player.champion.imageUrl,
                };
              })
            );
          },
          []
        ),
    };
  });
});

const hoverItemId = ref("");
const hoverItemPosition = ref({ top: 0, center: 0 });

const handleMouseOverItem = (
  event: { target: HTMLInputElement },
  itemId: string
) => {
  hoverItemId.value = itemId;
  const { top, left, width } = event.target.getBoundingClientRect();
  hoverItemPosition.value = {
    top,
    center: left + width / 2,
  };
};

let prevScroll = {
  x: window.scrollX,
  y: window.scrollY,
};
let scrollListener = () => {
  requestAnimationFrame(() => {
    hoverItemPosition.value = {
      top: hoverItemPosition.value.top - (window.scrollY - prevScroll.y),
      center: hoverItemPosition.value.center - (window.scrollX - prevScroll.x),
    };
    prevScroll = {
      x: window.scrollX,
      y: window.scrollY,
    };
  });
};

onMounted(() => {
  let prevScroll = {
    x: window.scrollX,
    y: window.scrollY,
  };
  window.addEventListener("scroll", scrollListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollListener);
});

const handleMouseOutItem = () => {
  hoverItemId.value = "";
};

const itemDesc = computed(() => {
  return itemStore.getItemDesc(hoverItemId.value) || "";
});
</script>

<template>
  <div class="match-detail-root">
    <MatchDetailCard
      class="match-detail-card"
      v-for="match in matches"
      :key="match.gameId"
      :game-length="match.gameLength"
      :game-type="match.gameType"
      :is-win="match.isWin"
      :match-created-time="match.createDate"
      :champion-image-url="match.champion.imageUrl"
      :perk-image-urls="match.peak"
      :spell-image-urls="match.spells"
      champion-name="레오나"
      :kill="match.stats.general.kill"
      :death="match.stats.general.death"
      :assist="match.stats.general.assist"
      :items="match.items"
      :users="match.users"
      :largest-multi-kill-string="match.stats.general.largestMultiKillString"
      :op-score-badge="match.stats.general.opScoreBadge"
      :kda-ratio-string="match.stats.general.kdaString"
      :cs="match.stats.general.cs"
      :cs-per-minute="match.stats.general.csPerMin"
      :contribution-for-kill-rate-string="
        match.stats.general.contributionForKillRate
      "
      :vision-ward-bought="match.stats.ward.visionWardsBought"
      :level="match.level"
      @MouseOverItem="handleMouseOverItem"
      @MouseOutItem="handleMouseOutItem"
    />

    <Teleport to="#tooltip-overlay">
      <Tooltip
        :desc="itemDesc"
        v-show="hoverItemId"
        :top="hoverItemPosition.top"
        :center="hoverItemPosition.center"
      />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.match-detail-root {
  & > .match-detail-card + .match-detail-card {
    margin-top: 8px;
  }
}
</style>
