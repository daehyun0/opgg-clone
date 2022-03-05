<script setup lang="ts">
import colors from "@/scripts/colors";

const props = defineProps<{
  imageUrl: string;
  width: number;
  height: number;
}>();
</script>

<template>
  <div class="slot" :style="{ width: width + 'px', height: height + 'px' }">
    <img
      v-if="imageUrl"
      :src="imageUrl"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.slot {
  @include borderRad(2px);
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>
