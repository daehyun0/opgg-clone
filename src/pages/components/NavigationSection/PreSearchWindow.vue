<script setup lang="ts">
import { onBeforeUnmount, watch, watchEffect } from "vue";

const props = defineProps<{
  input: string;
}>();

const stopWatch = watch(
  () => [props.input],
  async (newVal, oldVal, onCleanUp) => {
    const timeoutId = setTimeout(async () => {
      // const { data } = await opgg.findSummoner(props.input);
    }, 500);

    onCleanUp(() => clearTimeout(timeoutId));
  }
);

onBeforeUnmount(() => {
  stopWatch();
});
</script>

<template>
  <div class="history-window-root"></div>
</template>

<style scoped></style>
