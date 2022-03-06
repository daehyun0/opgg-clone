import Routes from "@/scripts/domain/route";
import { createRouter, createWebHistory } from "vue-router";

const SummonerSearchRoute = Routes.getSummonerSearchRoute();
const SummonerDetailRoute = Routes.getSummonerDetailRoute("");

const routes = [
  {
    path: SummonerSearchRoute.vueRouterPath,
    component: SummonerSearchRoute.component,
    name: SummonerSearchRoute.name,
  },
  {
    path: SummonerDetailRoute.vueRouterPath,
    component: SummonerDetailRoute.component,
    name: SummonerDetailRoute.name,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
