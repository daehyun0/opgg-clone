<script setup lang="ts">
import Tab from "@/components/Tab.vue";
import Colors from "@/scripts/colors";
import { computed, ref } from "vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const summonerDetailPageStore = useSummonerDetailPageStore();
const games = computed(() => summonerDetailPageStore.matchSummary?.games || []);

const emit = defineEmits<{
  (e: "select", target: string): void;
}>();

let tabKey = ref("전체");
const handleChangeTab = (newValue: string) => {
  emit("select", newValue);
};

const gameTypeOrder: { [key: string]: number } = {
  전체: 0,
  솔랭: 1,
  "자유 5:5 랭크": 2,
  일반: 3,
  "무작위 총력전": 4,
};

const uniqueGameTypes = computed(() => {
  return games.value
    ?.map((game: any) => game.gameType)
    ?.filter((game: any, index: number, self: string[]) => {
      return self.indexOf(game) === index;
    })
    ?.concat("전체")
    ?.sort((a: string, b: string) => {
      return gameTypeOrder[a] - gameTypeOrder[b];
    });
});

const optionsFormatted = computed(() => {
  return uniqueGameTypes?.value?.map((option: string) => {
    return {
      key: option,
      title: option,
    };
  });
});
</script>

<template>
  <Tab
    class="tabs"
    :options="optionsFormatted"
    name="match-summary-tab"
    :selected-key="tabKey"
    @select="handleChangeTab"
  />
</template>

<style scoped lang="scss">
.tabs {
  padding: 0 16px;
  background-color: v-bind("Colors.whiteFour");
  border-bottom: solid 1px v-bind("Colors.silverThree");

  &:deep > input + label {
    padding: 12px 0 10px;
    font-size: 12px;
    color: v-bind("Colors.greyishBrown");
  }

  &:deep > input:checked + label {
    color: v-bind("Colors.bluish");
    font-weight: bold;
    border-bottom: solid 2px v-bind("Colors.bluish");
  }

  &:deep > label ~ label {
    margin-left: 24px;
  }
}
</style>
