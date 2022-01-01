<template>
  <base-tooltip
    :text="name"
    placement="right"
  >
    <li class="flex">
      <router-link
        draggable="false"
        class="p-4 flex items-center justify-center text-69px opacity-25"
        :to="to"
      >
        <icon class="w-24px h-24px" :name="icon" />
      </router-link>
    </li>
  </base-tooltip>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
	to: RouteLocationRaw
	name: string
	icon: string
}>();

</script>
