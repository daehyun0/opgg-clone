<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/common/Card.vue";
import WinRate from "@/scripts/domain/winRate";
import Colors from "@/scripts/colors";

const props = defineProps<{
  hasResults: boolean;
  tierImageUrl: string;
  rankType: string;
  tier: string;
  division: string;
  tierRankPoint: number;
  winCount: number;
  loseCount: number;
}>();

const winRateString = computed(() => {
  return WinRate.getWinRateFormatted(props.winCount, props.loseCount);
});

const totalMatchCount = computed(() => props.winCount + props.loseCount);
</script>

<template>
  <Card class="rank-card-root" v-if="hasResults">
    <div class="ranked" v-if="hasResults">
      <img :src="tierImageUrl" />
      <div class="info">
        <div class="rank-type">{{ rankType }}</div>
        <div class="most-line-and-total-match-count">
          <span class="most-line">탑</span>&nbsp;
          <span class="total-match-count">(총 {{ totalMatchCount }}게임)</span>
        </div>
        <div class="tier">{{ tier }} {{ division }}</div>
        <div class="lp-and-total-match-count">
          <span class="lp">{{ tierRankPoint }} LP</span>
          <span> / </span>
          <span>{{ winCount }}승 {{ loseCount }}패</span>
        </div>
        <div class="win-rate">승률 {{ winRateString }}</div>
      </div>
    </div>

    <div class="unranked" v-if="!hasResults">
      <img src="@/assets/unranked.png">
      <div class="info">
        <div class="rank-type">{{ rankType }}</div>
        <div class="unranked">Unranked</div>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
// TODO: rollup inject only once
@import "@/styles/mixins.scss";

.rank-card-root {
  & > .ranked {
    @include flexRow(flex-start, center);
    padding: 9px 7px;

    & > img {
      width: 104px;
      height: 104px;
    }

    & > .info {
      & > .rank-type {
        font-size: 11px;
        color: v-bind("Colors.coolGrey");
      }

      & > .most-line-and-total-match-count {
        font-size: 12px;
        color: #353a3a;

        & > .most-line {
          font-weight: bold;
        }
      }

      & > .rank-type + .most-line-and-total-match-count {
        margin-top: 4px;
      }

      & > .tier {
        margin-top: 4px;
        font-size: 15px;
        font-weight: bold;
        color: v-bind("Colors.bluish");
      }

      & > .most-line-and-total-match-count + .tier {
        margin-top: 4px;
      }

      & > .lp-and-total-match-count {
        font-size: 12px;
        color: v-bind("Colors.coolGrey");

        & > .lp {
          font-weight: bold;
        }
      }

      & > .tier + .lp-and-total-match-count {
        margin-top: 4px;
      }

      & > .win-rate {
        font-size: 12px;
        color: v-bind("Colors.coolGrey");
      }

      & > .lp-and-total-match-count + .win-rate {
        margin-top: 2px;
      }
    }

    & > img + .info {
      margin-left: 8px;
    }
  }

  & > .unranked {
    @include flexRow(flex-start, center);
    padding: 16px 27px;

    & > img {
      width: 64px;
      height: 64px;
    }

    & > .info {
      font-size: 13px;
      color: v-bind('Colors.coolGrey');

      & > .rank-type {
        font-size: 11px;
        color: v-bind("Colors.coolGrey");
      }

      & > .unranked {
        font-weight: bold;
      }

      & > .rank-type + .unranked {
        margin-top: 2px;
      }
    }

    & > img + .info {
      margin-left: 28px;
    }
  }
}
</style>
