<script setup lang="ts">
import Colors from "@/scripts/colors";
import { computed } from "vue";
import WinRate from "@/scripts/domain/winRate";
import kda from "@/scripts/domain/kda";
import cs from "@/scripts/domain/cs";
import KdaRatioStringWithHighlight from "@/pages/SummonerDetailPage/components/KdaRatioStringWithHighlight.vue";

const props = defineProps<{
  mostChampionWinRateInfos: Array<{
    championName: string;
    cs: number;
    csPerMinute: number;
    winCount: number;
    loseCount: number;
    kill: number;
    death: number;
    assist: number;
    championImageUrl: string;
  }>;
}>();

const mostChampionsInfos = computed(() => {
  return props.mostChampionWinRateInfos.map((mostChampion: any) => {
    return {
      ...mostChampion,
      winRate: WinRate.getWinRateFormatted(
        mostChampion.winCount,
        mostChampion.loseCount
      ),
      kda: kda.getKdaAverage(
        mostChampion.kill,
        mostChampion.death,
        mostChampion.assist
      ),
      totalMatchCount: WinRate.getTotalCount(
        mostChampion.winCount,
        mostChampion.loseCount
      ),
      cs: cs.getCreepScoreFormatted(mostChampion.cs),
      csPerMinute: cs.getCreepScoreFormatted(mostChampion.csPerMinute),
    };
  });
});
</script>

<template>
  <div
    class="champion-win-rate-table"
    v-for="mostChampionInfo in mostChampionsInfos"
  >
    <img class="champion-image" :src="mostChampionInfo.championImageUrl" />
    <div class="info">
      <div class="col-1">
        <div class="champion-name main">
          {{ mostChampionInfo.championName }}
        </div>
        <div class="cs sub">
          <span class="cs">CS {{ mostChampionInfo.cs }}</span
          >&nbsp;<span class="cs-per-minute"
            >({{ mostChampionInfo.csPerMinute }})</span
          >
        </div>
      </div>
      <div class="col-2">
        <div class="kda main">
          <KdaRatioStringWithHighlight
            :value="mostChampionInfo.kda"
            append-string=":1 평점"
          />
        </div>
        <div class="kda-individual sub">
          {{ mostChampionInfo.kill }} / {{ mostChampionInfo.death }} /
          {{ mostChampionInfo.assist }}
        </div>
      </div>
      <div class="col-3">
        <div class="win-rate main">{{ mostChampionInfo.winRate }}</div>
        <div class="total-match-count sub">
          {{ mostChampionInfo.totalMatchCount }}게임
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.champion-win-rate-table {
  @include flexRow(flex-start, center);
  padding: 4px 14px;

  & > .champion-image {
    height: 45px;
    flex: 0 0 45px;
    @include borderRad(50%);
  }

  & > .info {
    flex: 0 1 100%;
    @include flexRow(space-between, center);

    & > .col-1,
    & > .col-2,
    & > .col-3 {
      .main {
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        color: v-bind("Colors.brownishGrey");
      }

      .sub {
        font-size: 11px;
        color: v-bind("Colors.coolGrey");
        text-align: center;
      }
    }

    & > .col-1 {
      .main {
        text-align: left;
      }

      .sub {
        text-align: left;
      }
    }
  }

  & > .champion-image + .info {
    margin-left: 10px;
  }

  & + .champion-win-rate-table {
    border-top: solid 1px v-bind("Colors.silverThree");
  }
}
</style>
