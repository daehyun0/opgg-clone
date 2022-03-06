<script setup lang="ts">
import MatchSummaryStatsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryStatsSection.vue";
import MatchSummaryChampionsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryChampionsSection.vue";
import MatchSummaryPositionsSection from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchSummary/MatchSummaryPositionsSection.vue";
import Colors from "@/scripts/colors";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";
import { computed } from "vue";

const summonerDetailPageStore = useSummonerDetailPageStore();
const matchSummary = computed(() => summonerDetailPageStore.matchSummary);
</script>

<template>
  <div class="match-summary-root">
    <MatchSummaryStatsSection class="summary" />
    <MatchSummaryChampionsSection
      class="champions"
    />
    <MatchSummaryPositionsSection
      class="positions"
    ></MatchSummaryPositionsSection>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-summary-root {
  @include flexRow(flex-start, flex-start);

  & > .summary {
    flex: 1 1 40.1%;
  }

  & > .champions {
    flex: 1 1 33.13%;
  }

  & > .summary + .champions {
    border-left: solid 1px v-bind("Colors.silverThree");
  }

  & > .positions {
    flex: 1 1 26.74%;
  }

  & > .champions + .positions {
    border-left: solid 1px v-bind("Colors.silverThree");
  }
}
</style>
