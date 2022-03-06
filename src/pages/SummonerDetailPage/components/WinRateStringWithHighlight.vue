<script setup lang="ts">
import Colors from "@/scripts/colors";
import { computed } from "vue";
import winRate from "@/scripts/domain/winRate";

const props = defineProps<{
  winCount: number;
  loseCount: number;
  prependString?: string;
  appendString?: string;
}>();

const percentString = computed(() => {
  return winRate.getWinRatePercent(props.winCount, props.loseCount);
});

const highlightClassName = computed(() => {
  console.log(winRate.getWinRate(props.winCount, props.loseCount));
  return (
    winRate.getWinRate(props.winCount, props.loseCount) > 0.6 && "excellent"
  );
});
</script>

<template>
  <span class="win-rate-string" :class="highlightClassName"
    >{{ prependString }}{{ percentString }}{{ appendString }}</span
  >
</template>

<style scoped lang="scss">
.win-rate-string {
}

.win-rate-string.excellent {
  color: #c6443e;
}

.win-rate-string:not(.excellent) {
  color: v-bind("Colors.coolGrey");
}
</style>
