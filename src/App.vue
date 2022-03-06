<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <router-view :key="route.fullPath"></router-view>
</template>
