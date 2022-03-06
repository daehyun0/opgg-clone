<script setup lang="ts">
import { computed } from "vue";
import kda from "@/scripts/domain/kda";
import Colors from "@/scripts/colors";
import MatchSummarySectionChampionImage from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryChampionImage.vue";
import KdaRatioStringWithHighlight from "@/pages/SummonerDetailPage/components/KdaRatioStringWithHighlight.vue";
import WinRateStringWithHighlight from "@/pages/SummonerDetailPage/components/WinRateStringWithHighlight.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";

const summonerDetailPageStore = useSummonerDetailPageStore();

const champions = computed(() => {
  return summonerDetailPageStore.matchSummary.champions;
});

const mappedChampions = computed(() => {
  return champions.value
    .map((champion: any) => {
      return {
        ...champion,
        isExist: true,
        kdaAverage: Number(
          kda.getKdaAverage(champion.kills, champion.deaths, champion.assists)
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
      {
        isExist: false,
      },
    ])
    .slice(0, 3);
});
</script>

<template>
  <div class="match-summary-section-champions-root">
    <div
      class="champion"
      v-for="champion in mappedChampions"
      :key="champion.key"
    >
      <MatchSummarySectionChampionImage
        class="champion-image"
        :champion-image-url="champion.imageUrl"
      />
      <div class="info" v-if="champion.isExist">
        <div class="champion-name">{{ champion.name }}</div>
        <div class="stat">
          <span class="win-rate">
            <WinRateStringWithHighlight
              class="value"
              :win-count="champion.wins"
              :lose-count="champion.losses"
              append-string="%"
            />
          </span>
          <span class="win-lose-count">
            ({{ champion.wins }}승 {{ champion.losses }}패)</span
          >
          |
          <KdaRatioStringWithHighlight
            class="kda-average"
            :value="champion.kdaAverage"
            append-string=" 평점"
          />
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
