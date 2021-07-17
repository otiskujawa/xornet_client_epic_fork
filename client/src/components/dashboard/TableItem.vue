<template>
  <!-- <div class="item py-0.5 px-2 flex items-center gap-2 justify-start">
    <Icon :icon="icon" class="w-4"/>
    <h1 class="min-w-32">{{device.hostname}}</h1>
    <h1 class="min-w-54 text-right">{{device.uuid}}</h1>
    <h1 class="min-w-24">{{device.uptime}}</h1>

    <h1 class="min-w-16">{{device.cpu_usage}}</h1>
    <h1 class="min-w-16">{{device.fan_status}}</h1>
    <h1 class="min-w-16">{{device.library}}</h1>
    <h1 class="min-w-16">{{device.memory_free}}</h1>
    <h1 class="min-w-16">{{device.memory_total}}</h1>
    <h1 class="min-w-16">{{device.temperature}}</h1>
  </div> -->
    <tr>
      <Icon :icon="icon" class="w-4"/>
      <td>{{device.hostname}}</td>
      <td class="uuid">{{device.uuid}}</td >
      <td>{{ device.uptime.d }}:{{ device.uptime.h }}:{{ device.uptime.m }}:{{device.uptime.s}}</td>
      <td>{{device.system_board_inlet_temp}}</td>
      <td>{{device.system_board_exhaust_temp}}</td>
      <td>{{device.system_board_power_consumption}}</td>
      <td>{{device.cpu1_temp}}</td>
      <td>{{device.cpu2_temp}}</td>
    </tr>
</template>

<script lang="ts" setup>
import Icon from "@/components/misc/Icon.vue";
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
  device: Object;
  icon: string,
}>();
</script>

<style lang="postcss" scoped>
tr {
  @apply font-medium text-11px px-2;
  font-family: "Work Sans", sans-serif;
  & .uuid {
    background: linear-gradient(90deg, #8676ff 0%, #4221ee 34.9%, #6142ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>

cpu_usage: 25.28
description: "US-48-G1, 5.43.36.12724, Linux 3.6.5"
fan_status: 0
hostname: "UniFiUS-48"
library: "unifi.switch"
memory_free: 119200
memory_total: 256252
temperature: 63
type: "switch"
uptime: 225391
uuid: "73d5a7198b7a4f8ba83ab56484a3adcf"