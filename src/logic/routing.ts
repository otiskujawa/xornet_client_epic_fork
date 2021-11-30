import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export const useAppParams = () => {
  const route = useRoute();
  return computed(() => {
    return route.params as {
      machine: string;
    };
  });
};
