<script setup lang="ts">
import Colors from "@/scripts/colors";
import IconHistoryRemove from "@/assets/images/icon-history-delete.png";
import { defineEmits } from "vue";

defineProps<{
  histories: string[];
}>();

const emit = defineEmits<{
  (e: "clickItem", item: string): void;
  (e: "removeItem", item: string): void;
}>();

const handleClickItem = (summonerName: string) => {
  emit("clickItem", summonerName);
};

const handleClickRemoveItem = (history: string) => {
  emit("removeItem", history);
};
</script>

<template>
  <ul class="list">
    <li
      class="item"
      v-for="history in histories"
      @click="handleClickItem(history)"
    >
      <div class="name">{{ history }}</div>
      <div class="interaction">
        <button
          class="remove-history"
          @click="(e) => handleClickRemoveItem(history)"
        >
          <img :src="IconHistoryRemove" />
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.list {
  color: v-bind("Colors.brownishGrey");
  font-size: 12px;

  & > .item {
    padding: 2px;
    @include flexRow(space-between, center);
    cursor: pointer;

    & > .interaction {
      & > .remove-history {
        cursor: pointer;

        & > img {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
