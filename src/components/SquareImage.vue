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

<style scoped>

</style>