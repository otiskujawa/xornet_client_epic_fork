<template>
  <div class="setting flex gap-4 items-center ">
    <Icon :icon="icon" class="w-6"/>
    <label class="flex-1 w-full" :for="name">{{name}}</label>
    <Switch :name="name" v-model="cockandballtorture" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit } from "vue";
import { useVModel } from "@vueuse/core";
import Switch from "@/components/library/Switch.vue";
import Icon from "@/components/misc/Icon.vue";

const props = defineProps<{
    name: string;
    icon: string;
    modelValue: boolean;
}>();

const emit = defineEmit(["update:modelValue"]);
const cockandballtorture = useVModel(props, "modelValue", emit);
</script>