import { useLocalStorage } from "@vueuse/core";

export const iconStroke = useLocalStorage<boolean>("iconsStroke", false);
export const tweenNumbers = useLocalStorage("tweenNumbers", true);

// export const settings = useLocalStorage<object>({"iconsStroke": false, "tweenNumbers": true})