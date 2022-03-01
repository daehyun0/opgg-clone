<script setup lang="ts">
import colors from "@/scripts/colors";
</script>

<template>
  <div class="tag-root">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.tag-root {
  @include borderRad(2px);
  border: solid 1px v-bind("colors.silverTwo");
  background-color: v-bind("colors.silver");
  color: v-bind("colors.slateGray");
  padding: 3px 4px;
  @include flexRow(flex-start, center);
  font-size: 11px;
}
</style>
