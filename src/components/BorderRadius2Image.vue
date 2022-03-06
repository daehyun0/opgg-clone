<script setup lang="ts">
defineProps<{
  imageUrl: string;
  size: number;
}>();
</script>

<template>
  <img
      :src="imageUrl"
      :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

img {
  @include borderRad(2px);
}
</style>