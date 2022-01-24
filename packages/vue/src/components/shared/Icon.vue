<template>
  <div class="icon flex items-center">
    <i-fluency-active-state v-if="name === 'status'" />
    <i-fluency-at-sign v-if="name === 'hostname'" />
    <i-fluency-happy-skull v-if="name === 'happy_skull'" />
    <i-fluency-lightning-bolt v-if="name === 'gpu_power_usage'" />
    <i-fluency-country v-if="name === 'country'" />
    <i-fluency-processor v-if="name === 'cpu_average_usage'" />
    <i-fluency-speedometer v-if="name === 'cpu_average_speed'" />
    <i-fluency-memory v-if="name === 'ram_usage'" />
    <i-fluency-switch v-if="name === 'network_switch'" />
    <i-fluency-temperature v-if="name === 'temperature'" />
    <i-fluency-thor-hammer v-if="name === 'action'" />
    <i-fluency-up v-if="name === 'upload'" />
    <i-fluency-down v-if="name === 'download'" />
    <i-fluency-user v-if="name === 'owner'" />
    <i-fluency-upgrade v-if="name === 'reporter_version'" />
    <i-fluency-video-card v-if="name === 'gpu_usage'" />
    <i-fluency-ipv6 v-if="name === 'public_ip'" />
    <i-fluency-clock v-if="name === 'reporter_uptime' || name === 'host_uptime'" />
    <i-fluency-processes v-if="name === 'process_count'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
