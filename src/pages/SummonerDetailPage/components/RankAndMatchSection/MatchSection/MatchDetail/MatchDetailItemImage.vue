<script setup lang="ts">
import Colors from "@/scripts/colors";
import BorderRadius2Image from "@/components/BorderRadius2Image.vue";
import { computed } from "vue";
import WinIconSlotDisabled from "@/assets/images/icon-slot-disabled-blue.png";
import LoseIconSlotDisabled from "@/assets/images/icon-slot-disabled-red.png";
import SquareImage from "@/components/SquareImage.vue";

const props = defineProps<{
  imageUrl: string;
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
  <div class="slot" :class="winClassName">
    <SquareImage
      v-if="ItemImageWithEmptyFallback"
      :image-url="ItemImageWithEmptyFallback"
      :size="22"
    />
  </div>
</template>

<style scoped lang="scss">
.slot {
  overflow: hidden;
  width: 22px;
  height: 22px;
  border-radius: 2px;
}

.slot.win {
  background-color: v-bind("Colors.greyBlue");
}

.slot.lose {
  background-color: v-bind("Colors.pinkishGreyFour");
}
</style>
