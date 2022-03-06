<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import {computed, defineProps, PropType} from "vue";
import getSeasonString from "@/scripts/getSeasonString";

const props = defineProps<{
  season: number;
  tier: string;
}>();

const seasonString = computed(() => getSeasonString(props.season));
</script>

<template>
  <tag class="previous-tag-root">
    <span class="season">{{ seasonString }}</span
    >&nbsp;<span class="tier">{{ props.tier }}</span>
  </tag>
</template>

<style scoped lang="scss">
.previous-tag-root {
  line-height: 1.0;
  letter-spacing: -0.42px;

  & > .season {
    font-weight: bold;
  }
}
</style>
