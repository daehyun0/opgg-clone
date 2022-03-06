<script setup lang="ts">
const props = defineProps<{
  imageUrl: string;
  width: number;
  height: number;
}>();
</script>

<template>
  <img
    :src="imageUrl"
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

img {
  @include borderRad(2px);
}
</style>
