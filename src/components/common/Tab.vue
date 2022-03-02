<script setup lang="ts">
import colors from "@/scripts/colors";

withDefaults(
  defineProps<{
    name: string;
    options: Array<{
      key: string;
      title: string;
    }>;
    selectedKey: string;
  }>(),
  {}
);

const emit = defineEmits<{
  (e: "select", target: string): void;
}>();

const handleChangeTab = (e: { target: HTMLInputElement }) => {
  console.log(e.target.id)
  emit("select", e.target.id);
};
</script>

<template>
  <div class="component-tabs-root">
    <template v-for="option in options" :key="option.key">
      <input
        type="radio"
        :id="option.key"
        :name="name"
        :checked="option.key === selectedKey"
        @change="handleChangeTab"
      />
      <label :for="option.key">{{ option.title }}</label>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.component-tabs-root {
  @include flexRow(flex-start, flex-start);

  & > input {
    display: none;
  }
}
</style>
