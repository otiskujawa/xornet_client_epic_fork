<template>
    <div class="relative w-12 h-6 cursor-pointer flex items-center" @click="active = !active">
        <div class="track" :class="{active}"></div>
        <div class="circle" :class="{active}"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit } from "vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
    name: string, 
    modelValue: boolean;
}>();

const emit = defineEmit(["update:modelValue"]);
const active = useVModel(props, "modelValue", emit);

</script>

<style lang="postcss" scoped>
.track, 
.circle {
    @apply transition duration-100;
}
.track {
    @apply w-full h-4 rounded-full top-1/2 left-0 bg-gray-500;
    &.active {
        @apply bg-secondary-100;
    }
}
.circle {
    @apply bg-secondary-300 w-5 h-5 rounded-full absolute top-1/2 transform -translate-y-1/2 box-content left-0;
    &:hover {
        @apply bg-secondary-400;
        box-shadow: 0 0 0 6px theme('colors.alpha.20');
    }
    &.active {
        @apply left-full -translate-x-full;
    }
}
</style>