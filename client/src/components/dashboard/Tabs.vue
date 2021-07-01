<template>
  <div class="flex flex-col">
    <div class="tabs flex gap-4 justify-between md:justify-start">
      <router-link :to="{ name: currentRoute, params: {view: routes[i]}}" v-for="(title, i) of titles" :key="title">
        <Icon :icon="icons[i]"/>{{titles[i]}}
      </router-link>
    </div>
    <div class="w-full h-1px bg-gray-500"></div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
export default {
  name: "Tabs",
  components: {
    Icon,
  },
  props: {
    currentRoute: { type: String, required: true },
    routes: { type: Array, required: true },
    titles: { type: Array, required: true },
    icons: { type: Array, required: true },
  }
}
</script>


<style lang="postcss" scoped>
.tabs {
  font-family: 'Work Sans';
}
.tabs a{
  transition: 100ms ease;
  @apply opacity-50 select-none border-gray-500 text-11px font-medium flex gap-2 pb-2 z-10 items-center px-1 whitespace-nowrap outline-none;
}
.tabs a:hover {
  @apply opacity-75;
}
.tabs a.router-link-active {
  @apply opacity-100 border-b-2 border-b-secondary-400 ;
}
.tabs a .icon {
  @apply w-5;
}
</style >