<script setup lang="ts">
import DoughnutChart from "@/components/common/DoughnutChart.vue";
import { computed } from "vue";
import winRate from "@/scripts/domain/winRate";
import Colors from "@/scripts/colors";

const props = defineProps<{
  winCount: number;
  loseCount: number;
}>();

const winRateString = computed(() => {
  return winRate.getWinRatePercent(props.winCount, props.loseCount) + "%";
});
</script>

<template>
  <DoughnutChart
    :width="90"
    :height="90"
    :stroke-width="10"
    :text="winRateString"
    :strokes="[
      {
        color: Colors.bluish,
        ratio: winCount,
      },
      {
        color: Colors.coral,
        ratio: loseCount,
      },
    ]"
  />
</template>

<style scoped></style>
