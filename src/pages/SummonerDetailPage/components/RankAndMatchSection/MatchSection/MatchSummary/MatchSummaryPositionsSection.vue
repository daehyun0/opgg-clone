<script setup lang="ts">
import { computed } from "vue";
import positionService from "@/scripts/domain/position";
import winRate from "@/scripts/domain/winRate";
import Colors from "@/scripts/colors";

import IconTop from "@/assets/images/icon-mostposition-top.png";
import IconAdc from "@/assets/images/icon-mostposition-adc.png";
import IconMid from "@/assets/images/icon-mostposition-mid.png";
import IconSup from "@/assets/images/icon-mostposition-sup.png";
import IconJng from "@/assets/images/icon-mostposition-jng.png";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const summonerDetailPageStore = useSummonerDetailPageStore();
const positions = computed(
  () => summonerDetailPageStore.matchSummary.positions
);

const mappedPositions = computed(() => {
  const totalGameCount = positions.value?.reduce(
    (acc: number, elem: any) => {
      return acc + elem.games;
    },
    0
  );

  return positions.value?.map((position: any) => {
    return {
      ...position,
      selectRatePercent: positionService.getSelectRatePercent(
        position.games,
        totalGameCount
      ),
      winRatePercent:
        winRate.getWinRatePercent(position.wins, position.losses) || 0,
    };
  });
});

const positionImage = {
  Top: IconTop,
  Bottom: IconAdc,
  Middle: IconMid,
  Support: IconSup,
  Jungle: IconJng,
};
</script>

<template>
  <div class="match-summary-section-position-root">
    <div class="desc">선호 포지션 (랭크)</div>
    <div
      class="prefer-position"
      v-for="position in mappedPositions"
      :key="position.position"
    >
      <img :src="positionImage[position.positionName]" class="position-icon" />
      <div class="info">
        <div class="name">{{ position.positionName }}</div>
        <div class="stat">
          <span class="select-rate">
            <span class="value">{{ position.selectRatePercent }}</span
            ><span>%</span>
          </span>
          <span class="divider">&nbsp;|&nbsp;</span>
          <span class="win-rate-title">승률</span>
          <span>&nbsp;</span>
          <span class="win-rate">
            <span class="value"> {{ position.winRatePercent }} </span>%</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-section-position-root {
  padding: 16px;

  & > .desc {
    font-size: 12px;
    color: v-bind("Colors.brownishGreyTwo");
  }

  & > .prefer-position {
    @include flexRow(flex-start, center);

    & > .position-icon {
      width: 28px;
      height: 28px;
    }

    & > .info {
      & > .name {
        font-size: 14px;
        color: v-bind("Colors.black");
      }

      & > .stat {
        font-size: 11px;
        color: v-bind("Colors.brownishGreyTwo");

        & > .select-rate {
          color: v-bind("Colors.bluish");

          & > .value {
            font-weight: bold;
          }
        }

        & > .win-rate {
          color: v-bind("Colors.black");

          & > .value {
            font-weight: bold;
          }
        }
      }
    }

    & > .position-icon + .info {
      margin-left: 8px;
    }
  }

  & > .desc + .prefer-position {
    margin-top: 20px;
  }

  & > .prefer-position + .prefer-position {
    margin-top: 20px;
  }
}
</style>
