<script setup lang="ts">
import StyleConstants from "@/scripts/styleConstants";
import PreviousTierTag from "@/pages/SummonerDetailPage/components/ProfileSection/PreviousTierTag.vue";
import ProfileWithInfo from "@/pages/SummonerDetailPage/components/ProfileSection/ProfileWithInfo.vue";
import { useSummonerDetailPageStore } from "@/store/summonerDetailPageStore";
import { computed } from "vue";

const summonerDetailPageStore = useSummonerDetailPageStore();

const tags = computed(() => summonerDetailPageStore.previousTiers);
const profile = computed(() => summonerDetailPageStore.profile);
</script>

<template>
  <section class="summoner-profile-section-root">
    <section class="tags">
      <PreviousTierTag
        class="tag"
        v-for="tag in tags"
        :key="tag"
        :season="tag.season"
        :tier="tag.tier"
      ></PreviousTierTag>
    </section>
    <section class="profile">
      <ProfileWithInfo
        :nickname="profile.nickname"
        :level="profile.level"
        :profile-border-image-url="profile.profileBorderImageUrl"
        :profile-image-url="profile.profileImageUrl"
        :rank="profile.rank"
        :rank-percent-of-top="profile.rankPercentOfTop"
      />
    </section>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.summoner-profile-section-root {
  max-width: v-bind("StyleConstants.maxWidth");
  box-sizing: border-box;
  margin: 0 auto;
  padding: 15px 20px;

  & > .tags {
    @include flexRow(flex-start, center);
    margin: 0 5px;

    & > .tag + .tag {
      margin-left: 7px;
    }
  }

  & > .profile {
    margin-top: 17px;
    padding: 0 10px;
  }
}
</style>
