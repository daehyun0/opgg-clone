<script setup lang="ts">
import Profile from "@/pages/SummonerDetailPage/components/Profile.vue";
import ProfileInfo from "@/pages/SummonerDetailPage/components/ProfileInfo.vue";

defineProps<{
  profileBorderImageUrl: string;
  profileImageUrl: string;
  level: number;
  nickname: string;
  rank: number;
  rankPercentOfTop: number;
}>();
</script>

<template>
  <section class="profile-with-info-root">
    <Profile
      class="profile"
      :profileBorderImageUrl="profileBorderImageUrl"
      :profileImageUrl="profileImageUrl"
      :level="level"
    ></Profile>
    <ProfileInfo
      class="info"
      :nickname="nickname"
      :rank="rank"
      :rank-percent-of-top="rankPercentOfTop"
    />
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.profile-with-info-root {
  @include flexRow(flex-start, flex-start);

  & > .profile + .info {
    margin-left: 17px;
  }
}
</style>
