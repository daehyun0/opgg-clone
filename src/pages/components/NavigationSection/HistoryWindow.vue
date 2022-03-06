<script setup lang="ts">
import History from "@/scripts/domain/history";
import ItemHistoryInfo from "@/assets/icon-history-info.png";
import Colors from "@/scripts/colors";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ListCol from "@/pages/components/NavigationSection/HistoryListCol.vue";

const histories = ref(History.getHistories());

const isHistoriesEmpty = computed(() => {
  return histories.value.length === 0;
});

const router = useRouter();
const handleClickItem = (summonerName: string) => {
  router.push(`/${summonerName}`);
};

const handleClickRemoveItem = (summonerName: string) => {
  History.removeHistory(summonerName);
  histories.value = History.getHistories();
};
</script>

<template>
  <div class="history-window-root">
    <div class="empty" v-if="isHistoriesEmpty">
      <img :src="ItemHistoryInfo" />

      <p class="desc">최근에 본 소환사가 없습니다.</p>
    </div>

    <ListCol
      v-else
      :histories="histories"
      @clickItem="handleClickItem"
      @removeItem="handleClickRemoveItem"
    ></ListCol>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.history-window-root {
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px 0px;
  padding: 8px;

  & > .empty {
    padding: 30px 12px;
    @include flexCol(center, center);

    & > img {
      width: 16px;
      height: 16px;
    }

    & > .desc {
      color: v-bind("Colors.brownishGrey");
      font-size: 13px;
    }

    & > img + .desc {
      margin-top: 12px;
    }
  }
}
</style>
