<template>
  <Card>
    <template #image>
    <img :src="require('@/assets/renders/server.png')" alt="" class="mix-blend-screen">
      <h1 class="text-xl">Create a new datacenter</h1>
    </template>
    <template #body>
      <div class="flex flex-col">
        <label for="name">Datacenter name</label>
        <input type="text" ref="name" class="text-black   ">
      </div>
    </template>
  </Card >
</template>

<script lang="ts" setup>
import Card from "@/components/library/Card.vue";
</script>
