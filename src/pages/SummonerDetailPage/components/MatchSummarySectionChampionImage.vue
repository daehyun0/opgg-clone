<script setup lang="ts">
import { computed } from "vue";
import IconNoChampion from "@/assets/icon-no-champion.png";
import CircleImage from "@/components/CircleImage.vue";

const props = defineProps<{
  championImageUrl: string;
}>();

const championImageWithFallback = computed(() => {
  return props.championImageUrl || IconNoChampion;
});
</script>

<template>
  <CircleImage
    :size="34"
    :image-url="championImageWithFallback"
  />
</template>

<style scoped></style>
