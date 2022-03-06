<script setup lang="ts">
import MatchDetailCard from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetailCard.vue";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useItemsStore } from "@/store/items";
import Tooltip from "@/components/Tooltip.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const itemStore = useItemsStore();
const summonerDetailPageStore = useSummonerDetailPageStore();

const matches = computed(() => summonerDetailPageStore.matches);

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
      :match="match"
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
