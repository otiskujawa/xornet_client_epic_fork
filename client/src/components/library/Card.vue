<script lang="ts" setup></script>

<template>
  <div>
    <div class="bg-gray-400 p-3">
      <slot name="image" />
    </div>
    <div class="p-3">
      <slot name="body"/>
    </div>
  </div >
</template>
