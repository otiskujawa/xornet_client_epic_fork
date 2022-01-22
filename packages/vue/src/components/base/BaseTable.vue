<template>
  <table class="w-full text-xs table-auto">
    <tr class="headerRow text-left ">
      <slot name="headers" />
    </tr>

    <slot name="rows" />
  </table>
</template>

<script setup lang="ts">
</script>

<style  lang="postcss">

.header {
  @apply mb-4;
}

tr:not(.headerRow) {
  @apply hover:bg-background-400 hover:bg-opacity-50 cursor-pointer;
}

tr:hover {
  & th:not(.header) {
    @apply text-opacity-100;
  }
}

th {
  @apply text-white text-left text-opacity-50 font-normal px-4 py-1.5 ;
}

</style>
