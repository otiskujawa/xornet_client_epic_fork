<template>
  <tag v-if="user?.is_admin" text="Admin" class="text-[#8bdc82] bg-[#8bdc82]" />
</template>

<script setup lang="ts">
import Tag from "/@/components/Tag.vue";
import type { IUser } from "/@/types/api/user";
defineProps<{user: IUser}>();
</script>
