<template>
  <Card>
    <template #image>
    <!-- <img src="https://cdn.discordapp.com/attachments/806300597338767450/859273732631429120/46fff680823a7d975a7c52be0f1a813d.webp" alt=""> -->
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
