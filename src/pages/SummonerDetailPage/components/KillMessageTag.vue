<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import EnumKillingMessageType from "@/scripts/types/enumKillingMessageType";
import Colors from "@/scripts/colors";

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
  color: v-bind("Colors.whiteTwo");
}

.kill-message-tag-root.annihilation {
  @include border-solid-1(v-bind("Colors.warmPurple"));
  background-color: v-bind("Colors.amethyst");
}

.kill-message-tag-root.multikill {
  @include border-solid-1(v-bind("Colors.reddishTwo"));
  background-color: v-bind("Colors.tomato");
}
</style>
