import { defineStore } from "pinia";
import items from "@/assets/items.json";

export const useItemsStore = defineStore("items", {
  state: () => {
    return items;
  },
});
