<template>
  <nav>
    <ul>
      <li v-for="route of routes">
        <router-link :to="route.name"> <icon :name="route.icon" />{{ route.name }} </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { routes } from "/@/router";
import icon from "/@/components/shared/Icon.vue";
</script>

<style scoped lang="postcss"></style>
