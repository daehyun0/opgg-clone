<script setup lang="ts">
import ChampionImage from "@/components/ChampionImage.vue";
import { computed, defineProps } from "vue";
import winRate from "@/scripts/domain/winRate";
import kda from "@/scripts/domain/kda";
import Colors from "@/scripts/colors";

const props = defineProps<{
  rawChampions: any[];
}>();

const champions = computed(() => {
  return props.rawChampions
    ?.map((champion: any) => {
      return {
        ...champion,
        isExist: true,
        winRatePercent: winRate.getWinRatePercent(
          champion.wins,
          champion.losses
        ),
        kdaAverage: kda.getKdaAverage(
          champion.kills,
          champion.deaths,
          champion.assists
        ),
      };
    })
    .concat([
      {
        isExist: false,
      },
      {
        isExist: false,
      },
    ])
    .slice(0, 3);
});
</script>

<template>
  <div class="match-summary-section-champions-root">
    <div class="champion" v-for="champion in champions" :key="champion.key">
      <ChampionImage
        class="champion-image"
        :image-url="champion.imageUrl"
        :width="34"
        :height="34"
      />
      <div class="info" v-if="champion.isExist">
        <div class="champion-name">{{ champion.name }}</div>
        <div class="stat">
          <span class="win-rate">
            <span class="value">{{ champion.winRatePercent }}</span>
            <span>% </span>
          </span>
          <span class="win-lose-count"
            >({{ champion.wins }}승 {{ champion.losses }}패)</span
          >
          |
          <span class="kda-average">{{ champion.kdaAverage }} 평점</span>
        </div>
      </div>
      <div class="info desc-empty" v-else>챔피언 정보가 없습니다.</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-section-champions-root {
  padding: 16px;

  & > .champion {
    @include flexRow(flex-start, center);

    & > .info {
      & > .champion-name {
        font-size: 14px;
        color: v-bind("Colors.black");
      }

      & > .stat {
        font-size: 11px;
        color: v-bind("Colors.greyishBrown");

        & > .win-rate {
          & > .value {
            font-weight: bold;
          }
        }

        & > .kda-average {
          font-weight: bold;
        }
      }

      & > .champion-name + .stat {
        margin-top: 3px;
      }
    }

    & > .info.desc-empty {
      font-size: 11px;
      color: v-bind("Colors.warmGreyTwo");
    }

    & > .champion-image + .info {
      margin-left: 8px;
    }
  }

  & > .champion + .champion {
    margin-top: 12px;
  }
}
</style>
