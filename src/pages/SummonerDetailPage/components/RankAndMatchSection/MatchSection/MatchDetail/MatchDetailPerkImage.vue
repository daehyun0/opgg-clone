<script setup lang="ts">
import CircleImage from "@/components/CircleImage.vue";

const props = defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <CircleImage :image-url="imageUrl" :size="22" />
</template>

<style scoped lang="scss"></style>
