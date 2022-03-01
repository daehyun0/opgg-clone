<script setup lang="ts">
import LevelBox from "@/components/LevelBox.vue";

defineProps<{
  profileBorderImageUrl: string;
  profileImageUrl: string;
  level: number;
}>()
</script>

<template>
  <div class="profile-root">
    <img class="profile" :src="profileImageUrl">
    <img class="profile-border" :Src="profileBorderImageUrl">
    <LevelBox class="level-box" :level="level"/>
  </div>
</template>

<style scoped lang="scss">
.profile-root {
  position: relative;

  & > .profile {
    width: 100px;
    height: 100px;
  }

  & > .profile-border {
    width: 120px;
    height: 120px;

    position: absolute;
    top: -10px;
    left: -10px;
  }

  & > .level-box {
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>