<script setup lang="ts">
import PreviousTierTag from "@/components/PreviousTierTag.vue";
import { defineProps } from "vue";

defineProps<{
  tags: Array<{
    season: Number;
    tier: String;
  }>;
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
    <section class="profile">profile&info</section>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.summoner-profile-section-root {
  max-width: 1000px;
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
    margin-top: 6px;
    padding: 0 10px;
  }
}
</style>
