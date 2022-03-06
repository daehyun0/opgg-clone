<script setup lang="ts">
import History from "@/scripts/domain/history";
import ItemHistoryInfo from "@/assets/icon-history-info.png";
import IconHistoryRemove from "@/assets/icon-history-delete.png";
import Colors from "@/scripts/colors";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const histories = ref(History.getHistories());

const isHistoriesEmpty = computed(() => {
  return histories.value.length === 0;
});

const router = useRouter();
const handleClickItem = (summonerName: string) => {
  router.push(`/${summonerName}`);
};

const handleClickRemoveItem = (
  e: { target: HTMLInputElement },
  summonerName: string
) => {
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

    <ul class="list" v-else>
      <li
        class="item"
        v-for="history in histories"
        @click="handleClickItem(history)"
      >
        <div class="name">{{ history }}</div>
        <div class="interaction">
          <button
            class="remove-history"
            @click="(e) => handleClickRemoveItem(e, history)"
          >
            <img :src="IconHistoryRemove" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

img {
  @include borderRad(50%);
}

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

  & > .list {
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
}
</style>
