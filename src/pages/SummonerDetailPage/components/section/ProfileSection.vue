<script setup lang="ts">
import StyleConstants from "@/scripts/styleConstants";
import PreviousTierTag from "@/components/PreviousTierTag.vue";
import { defineProps } from "vue";
import ProfileWithInfo from "@/components/ProfileWithInfo.vue";

defineProps<{
  tags: Array<{
    season: Number;
    tier: String;
  }>;
  profileBorderImageUrl: string;
  profileImageUrl: string;
  level: number;
  nickname: string;
  rank: number;
  rankPercentOfTop: number;
}>();
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
        :nickname="nickname"
        :level="level"
        :profile-border-image-url="profileBorderImageUrl"
        :profile-image-url="profileImageUrl"
        :rank="rank"
        :rank-percent-of-top="rankPercentOfTop"
      />
    </section>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.summoner-profile-section-root {
  max-width: v-bind('StyleConstants.maxWidth');
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
