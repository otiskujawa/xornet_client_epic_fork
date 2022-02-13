<template>
  <base-tooltip
    :text="name"
    placement="right"
  >
    <template v-if="shortcut" #content>
      <base-kbd v-for="k of shortcut" :key="k" :key-button="k" />
    </template>
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
        v-else-if="href"
        target="_blank"
        draggable="false"
        class="navButton"
        :href="href"
        @click="require('shell').openExternal(href)"
      >

        <slot />
      </a>
      <div v-else class="navButton" @click="handleFn && handleFn()">
        <slot />
      </div>
    </li>
  </base-tooltip>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import BaseKbd from "/@/components/base/BaseKbd.vue";
import BaseTooltip from "./base/BaseTooltip.vue";

defineProps<{
	to?: RouteLocationRaw
	handleFn?: Function
	href?: string
	name: string
	shortcut?: string[]
}>();

</script>

<style lang="postcss" scoped>

.navButton {
  @apply p-3 sm:p-4 flex cursor-pointer items-center justify-center w-full h-full opacity-25;
  }

a, div {
  &:hover {
    @apply opacity-50;
  }
  &.router-link-active {
    @apply opacity-100;
  }
}
</style>
