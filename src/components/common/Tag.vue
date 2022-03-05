<script setup lang="ts">
import Colors from "@/scripts/colors";
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
  @include border-solid-1(v-bind('Colors.silverTwo'));
  background-color: v-bind("Colors.silver");
  color: v-bind("Colors.slateGray");
  padding: 3px 4px;
  @include flexRow(flex-start, center);
  font-size: 11px;
}
</style>
