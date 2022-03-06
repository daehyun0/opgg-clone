import SummonerDetailPage from "@/pages/SummonerDetailPage/index.vue";
import SummonerSearchPage from "@/pages/SummonerSearchPage/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: SummonerSearchPage,
  },
  {
    path: "/:summonerName",
    component: SummonerDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
