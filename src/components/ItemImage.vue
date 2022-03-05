<script setup lang="ts">
import Colors from "@/scripts/colors";
import WinIconSlotDisabled from "@/assets/icon-slot-disabled-blue.png";
import LoseIconSlotDisabled from "@/assets/icon-slot-disabled-red.png";
import { computed } from "vue";

const props = defineProps<{
  imageUrl: string;
  width: number;
  height: number;
  isWin: boolean;
  isDisabled: boolean;
}>();

const ItemImageWithEmptyFallback = computed(() => {
  if (props.isDisabled) {
    return props.isWin ? WinIconSlotDisabled : LoseIconSlotDisabled;
  }
  return props.imageUrl;
});

const winClassName = computed(() => {
  if (props.isDisabled) {
    return "";
  }
  return props.isWin ? "win" : "lose";
});
</script>

<template>
  <div
    class="slot"
    :class="winClassName"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <img v-if="ItemImageWithEmptyFallback" :src="ItemImageWithEmptyFallback" />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.slot {
  @include borderRad(2px);
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
}

.slot.win {
  background-color: v-bind("colors.greyBlue");
}

.slot.lose {
  background-color: v-bind("colors.pinkishGreyFour");
}
</style>
