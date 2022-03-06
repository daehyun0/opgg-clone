import { defineStore } from "pinia";
import items from "@/assets/items.json";

export const useItemsStore = defineStore("items", {
  state: (): {
    items: { data: { [key: string]: { name: string; description: string } } };
  } => {
    return {
      items,
    };
  },
  getters: {
    getItemDesc: (state): Function => {
      return (itemId: string): string => {
        if (!itemId) {
          return "";
        }
        const item = state.items.data[itemId];
        return item.name + ": " + item.description;
      };
    },
  },
});
