<template>
  <div class="icon flex items-center">
    <i-fluency-active-state v-if="name === 'status'" />
    <i-fluency-at-sign v-if="name === 'hostname'" />
    <i-fluency-happy-skull v-if="name === 'happy_skull'" />
    <i-fluency-lightning-bolt v-if="name === 'gpu_power_usage'" />
    <i-fluency-processor v-if="name === 'cpu_usage'" />
    <i-fluency-memory v-if="name === 'ram_usage'" />
    <i-fluency-switch v-if="name === 'network_switch'" />
    <i-fluency-temperature v-if="name === 'temperature'" />
    <i-fluency-thor-hammer v-if="name === 'action'" />
    <i-fluency-up v-if="name === 'upload'" />
    <i-fluency-down v-if="name === 'download'" />
    <i-fluency-user v-if="name === 'owner'" />
    <i-fluency-video-card v-if="name === 'gpu_usage'" />
    <i-fluency-ipv6 v-if="name === 'external_ip'" />
    <i-fluency-processes v-if="name === 'process_count'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
