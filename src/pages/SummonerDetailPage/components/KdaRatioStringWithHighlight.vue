<script setup lang="ts">
import Colors from "@/scripts/colors";
import { computed } from "vue";

const props = defineProps<{
  value: number;
  appendString: string;
}>();

const highlightClassName = computed(() => {
  if (props.value > 5) {
    return "excellent";
  }

  if (props.value > 4) {
    return "great";
  }

  if (props.value > 3) {
    return "good";
  }
});
</script>

<template>
  <span :class="highlightClassName">{{ value }}{{ appendString }}</span>
</template>

<style scoped lang="scss">
span {
  color: v-bind("Colors.brownishGrey");
}

.good {
  color: #2daf7f;
}

.great {
  color: #1f8ecd;
}

.excellent {
  color: #e19205;
}
</style>
