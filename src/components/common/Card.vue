<script setup lang="ts">
import Colors from "@/scripts/colors";
</script>

<template>
  <div class="card-root">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.card-root {
  @include border-solid-1(v-bind("colors.silverThree"));
  @include borderRad(2px);
  background-color: v-bind('colors.whiteFour')
}
</style>
