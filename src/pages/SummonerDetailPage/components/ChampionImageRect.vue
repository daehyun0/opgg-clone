<script setup lang="ts">
import ChampionImage from "@/pages/SummonerDetailPage/components/ChampionImage.vue";

const props = defineProps<{
  imageUrl: string;
  width: number;
  height: number;
}>();
</script>

<template>
  <ChampionImage
    class="champion-image"
    :image-url="imageUrl"
    :width="width"
    :height="height"
  />
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.champion-image {
  border-radius: 0;
}
</style>
