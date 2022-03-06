<script setup lang="ts">
import BorderRadius2Image from "@/components/BorderRadius2Image.vue";

const props = defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <BorderRadius2Image :image-url="imageUrl" :size="22" />
</template>

<style scoped lang="scss"></style>
