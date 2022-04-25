<template>
  <table
    class="w-full text-xs" :class="[
      state.settings.general.fixed_column_width ? 'table-fixed' : 'table-auto',
      state.settings.general.compact_columns && 'compact ml-3 mr-3'
    ]"
  >
    <tr
      class="headerRow text-left "
    >
      <slot name="headers" />
    </tr>

    <slot name="rows" />
  </table>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
const state = useState();
</script>

<style  lang="postcss">

.header {
  @apply mb-4;
}

table {
  tr {

    &:not(.headerRow) {
      @apply hover:bg-background-400 hover:bg-opacity-50;
    }

    &:hover {
      & th:not(.header) {
        @apply text-opacity-100;
      }
    }

    th {
      @apply text-white text-left text-opacity-50 font-normal px-4 py-1.5;
    }

  }
  &.compact tr th {
      @apply py-1 px-1;
  }

}

</style>
