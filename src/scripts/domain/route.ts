import SummonerSearchPage from "@/pages/SummonerSearchPage/index.vue";
import SummonerDetailPage from "@/pages/SummonerDetailPage/index.vue";
import { Component } from "vue";

interface Route {
  vueRouterPath: string;
  path: string;
  component: Component;
  name: string;
}

export default {
  getSummonerDetailRoute(summonerName: string): Route {
    return {
      vueRouterPath: "/:summonerName",
      path: `/${summonerName}`,
      component: SummonerDetailPage,
      name: "summonerDetailPage",
    };
  },
  getSummonerSearchRoute(): Route {
    return {
      vueRouterPath: "/",
      path: "/",
      component: SummonerSearchPage,
      name: "summonerSearchPage",
    };
  },
};
