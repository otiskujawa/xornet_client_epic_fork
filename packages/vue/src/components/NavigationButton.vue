<template>
  <base-tooltip
    :text="name"
    placement="right"
  >
    <li class="flex">
      <router-link
        v-if="to"
        draggable="false"
        class="navButton"
        :to="to"
      >
        <slot />
      </router-link>
      <a
        v-if="href"
        target="_blank"
        draggable="false"
        class="navButton"
        :href="href"
        @click="require('shell').openExternal(href)"
      >
        <slot />
      </a>
    </li>
  </base-tooltip>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
	to?: RouteLocationRaw
	href?: string
	name: string
}>();

</script>

<style lang="postcss" scoped>

.navButton {
  @apply p-4 flex items-center justify-center w-full h-full opacity-25;
}

a {
  &:hover {
    @apply opacity-50;
  }
  &.router-link-active {
    @apply opacity-100;
  }
}
</style>
