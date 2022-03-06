<script setup lang="ts">
import Colors from "@/scripts/colors";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    desc: string;
    top: number;
    center: number;
  }>(),
  {
    desc: "",
  }
);

</script>

<template>
  <div
    class="component-tooltip-root"
    :style="{ top: `${top}px`, left: center + 'px' }"
  >
    <div class="desc" v-html="desc"></div>
    <div class="tail"></div>
  </div>
</template>

<style scoped lang="scss">
.component-tooltip-root {
  position: fixed;
  transform: translate(-50%, calc(-100%));

  & > .desc {
    padding: 10px;
    font-size: 11px;
    line-height: 15px;
    color: v-bind("Colors.whiteTwo");
    background-color: #222727;
  }

  & > .tail {
    width: 16px;
    height: 16px;
    margin: 0 auto;
    box-sizing: border-box;
    border: solid 8px transparent;
    border-top: solid 8px #222727;
  }
}
</style>
