<script setup lang="ts">
import Colors from "@/scripts/colors";
import RankFormatter from "@/scripts/rankFormatter";
import {computed} from "vue";

const props = defineProps<{
  nickname: string;
  rank: number;
  rankPercentOfTop: number;
}>();

const formattedRank = computed(() => RankFormatter.getRankDecimalFormat(props.rank));
const formattedRankPercentOfTop = computed(() => RankFormatter.getRankPercentOfTopDecimalFormat(props.rankPercentOfTop));
</script>

<template>
  <div class="info">
    <h2 class="nickname">{{ nickname }}</h2>
    <div class="rank">
      레더 랭킹
      <b class="highlight">{{ formattedRank }}</b
      >위 (상위 {{ formattedRankPercentOfTop }}%)
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  & > .nickname {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.77px;
    color: v-bind("Colors.charcoal");
  }

  & > .nickname + .rank {
    margin-top: 4px;
  }

  & > .rank {
    font-size: 11px;
    letter-spacing: -0.42px;
    color: v-bind('Colors.slateGray');

    & > .highlight {
      font-weight: bold;
    }
  }
}
</style>
