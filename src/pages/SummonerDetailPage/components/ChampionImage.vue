<script setup lang="ts">
import IconNoChampion from '@/assets/icon-no-champion.png'

const props = defineProps<{
  imageUrl: string;
  width: number;
  height: number;
}>();

const championImageProfileUrl = props.imageUrl || IconNoChampion;
</script>

<template>
  <img
    :src="championImageProfileUrl"
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

img {
  @include borderRad(50%);
}
</style>
