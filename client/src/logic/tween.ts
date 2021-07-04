import { tweenNumbers } from "@/states/prefs";
import { Ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { TransitionPresets, useTransition } from "@vueuse/core";

export const tweened = (val: Ref<number>) => {
  return useTransition(val, {
    duration: 500,
    transition: TransitionPresets.easeInOutCubic,
    disabled: !tweenNumbers.value
  });
};
