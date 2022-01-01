<template>
  <table class="w-full text-xs table-auto">
    <tr class="headerRow text-left ">
      <th v-for="header of headers" :key="header" class="header cursor-pointer hover:text-opacity-100">
        {{ header }}
      </th>
    </tr>

    <slot />
  </table>
</template>

<script setup lang="ts">
defineProps<{
	headers: string[]
}>();

</script>

<style  lang="postcss">

.header {
  @apply mb-4;
}

tr:not(.headerRow) {
  @apply hover:bg-background-400 cursor-pointer;
}

tr:hover {
  & th:not(.header) {
    @apply text-opacity-100;
  }
}

th {
  @apply text-white text-opacity-50 font-normal px-4 py-1.5 ;
}

</style>
