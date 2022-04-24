<template>
  <tag v-if="user?.is_admin" text="Admin" class="text-cyan-500 bg-cyan-500" />
</template>

<script setup lang="ts">
import Tag from "/@/components/Tag.vue";
import type { IUser } from "/@/types/api/user";
defineProps<{user: IUser}>();
</script>
