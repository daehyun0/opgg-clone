<script setup lang="ts">
import Colors from "@/scripts/colors";
import BorderRadius2Image from "@/components/BorderRadius2Image.vue";
import { computed, ref } from "vue";
import WinIconSlotDisabled from "@/assets/images/icon-slot-disabled-blue.png";
import LoseIconSlotDisabled from "@/assets/images/icon-slot-disabled-red.png";
import SquareImage from "@/components/SquareImage.vue";

const props = defineProps<{
  itemId: string;
  imageUrl: string;
  isWin: boolean;
  isDisabled: boolean;
}>();

const emit = defineEmits<{
  (
    e: "MouseOverItem",
    event: { target: HTMLInputElement },
    itemId: string
  ): void;
  (e: "MouseOutItem"): void;
}>();

const handleMouseOverImage = (
  event: { target: HTMLInputElement },
  itemId: string
) => {
  emit("MouseOverItem", event, itemId);
};

const handleMouseOutImage = () => {
  emit("MouseOutItem");
};

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
      @mouseover="e => handleMouseOverImage(e, itemId)"
      @mouseout="handleMouseOutImage"
    />
  </div>
</template>

<style scoped lang="scss">
.slot {
  width: 22px;
  height: 22px;
  border-radius: 2px;
  position: relative;

  & > img {
    border-radius: 2px;
  }
}

.slot.win {
  background-color: v-bind("Colors.greyBlue");
}

.slot.lose {
  background-color: v-bind("Colors.pinkishGreyFour");
}
</style>
