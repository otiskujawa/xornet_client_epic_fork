<template>
  <tag :text="label.name" :color="label.color" :description="label.description">
    <i-fluency-tag />
  </tag>
</template>

<script setup lang="ts">
import Tag from "../Tag.vue";
import type { Label } from "/@/types/api/label";
defineProps<{label: Label}>();
</script>
