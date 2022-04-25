<template>
  <tag v-if="label" :text="label.name" :color="label.color" class="whitespace-nowrap" :description="noDescription ? undefined : label.description" @mouseenter="isShowingDelete = true" @mouseleave="isShowingDelete = false">
    <i-fluency-trash v-if="isShowingDelete && !isDeleting" class="w-4 h-4 cursor-pointer" @click="isDeleting = true; state.labels.delete(label).then(() => isDeleting = false)" />
    <label-icon v-else-if="!isDeleting" :icon="label.icon" />
    <base-loading-spinner v-if="isDeleting" class="w-4 h-4" />
  </tag>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tag from "../Tag.vue";
import { useState } from "/@/app";
import type { Label } from "/@/types/api/label";
import BaseLoadingSpinner from "../base/BaseLoadingSpinner.vue";
import LabelIcon from "../shared/LabelIcon.vue";
defineProps<{label: Label; noDescription?: boolean}>();
const isShowingDelete = ref(false);
const isDeleting = ref(false);
const state = useState();
</script>
