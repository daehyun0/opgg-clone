<script setup lang="ts">
import Colors from "@/scripts/colors";

const props = defineProps<{
  level: number
}>()

</script>

<template>
  <div class="level-box-root">
    {{level}}
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.level-box-root {
  width: 44px;
  height: 24px;
  @include flexRow(center, center);
  background: 100% 100% url('@/assets/bg-levelbox.png') no-repeat;
  color: v-bind('Colors.dullYellow');
  font-size: 14px;
}
</style>