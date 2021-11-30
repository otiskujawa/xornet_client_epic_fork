<script lang="ts" setup>
import { defineProps, ref } from "vue";
import Icon from "@/components/misc/Icon.vue";
const props = defineProps<{
  icon: string;
  name: string;
  description: string;
}>();

const open = ref<boolean>(false);
</script>

<template>
  <div
    class="settingsButton overflow-hidden select-none w-full flex flex-col xl:max-w-70/100 bg-gray-100 rounded-4px"
    @click="active = !active"
  >
    <div
      class="top cursor-pointer w-full p-4 rounded-b-4px transition duration-100 bg-gray-300 hover:bg-primary-300 flex justify-between"
      @click="open = !open"
    >
      <div class="left flex gap-4 items-center">
        <Icon :icon="icon" class="w-8" />
        <div class="text flex flex-col gap-2 ">
          <h1 class="font-semibold text-sm leading-none">{{ name }}</h1>
          <p class="font-medium text-alpha-60 text-11px leading-none">{{ description }}</p>
        </div>
      </div>
      <Icon class="w-4 transition duration-100 transform" :class="{ 'rotate-180': open }" icon="chevron-down" />
    </div>
    <div v-show="open" class="p-4 flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
