<script setup lang="ts">
import Tag from "@/components/common/Tag.vue";
import EnumKillingMessageType from "@/scripts/types/enumKillingMessageType";
import colors from "@/scripts/colors";

withDefaults(
  defineProps<{
    title: string;
    type: EnumKillingMessageType;
  }>(),
  {
    title: "",
    type: "",
  }
);
</script>

<template>
  <Tag class="kill-message-tag-root" :class="type">
    {{ title }}
  </Tag>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.kill-message-tag-root {
  border-radius: 9px;
  padding: 3px 5px;
  line-height: 1.0;
  color: v-bind("colors.whiteTwo");
}

.kill-message-tag-root.annihilation {
  @include border-solid-1(v-bind("colors.warmPurple"));
  background-color: v-bind("colors.amethyst");
}

.kill-message-tag-root.multikill {
  @include border-solid-1(v-bind("colors.reddishTwo"));
  background-color: v-bind("colors.tomato");
}
</style>
