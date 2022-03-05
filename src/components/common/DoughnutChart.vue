<script setup lang="ts">
import { computed } from "vue";

interface Stroke {
  color: string;
  ratio: number;
}

const props = defineProps<{
  width: number;
  height: number;
  strokes: Array<Stroke>;
  strokeWidth: number;
  text: string;
}>();

const viewBox = computed(() => {
  return `0 0 ${props.width} ${props.height}`;
});

const cx = computed(() => {
  return props.width / 2;
});

const cy = computed(() => {
  return props.height / 2;
});

const radius = computed(() => {
  return Math.min(props.width, props.height) / 2 - props.strokeWidth / 2;
});

const circumference = computed(() => 2 * Math.PI * radius.value);
const totalRatio = computed(() =>
  props.strokes.reduce((acc: number, stroke: Stroke) => acc + stroke.ratio, 0)
);

const calcArc = (myRatio: number) => {
  return circumference.value * (myRatio / totalRatio.value);
};

const getStrokeDashArray = (myRatio: number) => {
  if (!myRatio) {
    return "0";
  }

  const arc = calcArc(myRatio);
  return `${arc} ${circumference.value - arc}`;
};

const defaultDashOffset = computed(() => {
  return circumference.value * 0.75 - calcArc(props.strokes[0].ratio);
});

const getStrokeDashOffset = (myIdx: number) => {
  const offsetBeforeMine = props.strokes
    .slice(0, myIdx)
    .reduce((acc: number, stroke: Stroke) => acc + calcArc(stroke.ratio), 0);
  return (offsetBeforeMine + defaultDashOffset.value) * -1;
};
</script>

<template>
  <svg :width="width" :height="height" :viewBox="viewBox">
    <circle
      v-for="(stroke, idx) in strokes"
      :cx="cx"
      :cy="cy"
      :r="radius"
      fill="transparent"
      :stroke="stroke.color"
      :stroke-width="strokeWidth"
      :stroke-dasharray="getStrokeDashArray(stroke.ratio)"
      :stroke-dashoffset="getStrokeDashOffset(idx)"
    ></circle>
    <text
      x="45"
      y="45"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="#555"
      font-weight="bold"
      font-size="14px"
    >
      {{ text }}
    </text>
  </svg>
</template>

<style scoped lang="scss"></style>
