<template>
  <div class="icon flex items-center">
    <i-fluency-close v-if="name === 'close'" />
    <i-fluency-computer v-if="name === 'computer'" />
    <i-fluency-down v-if="name === 'down'" />
    <i-fluency-logs v-if="name === 'logs'" />
    <i-fluency-maximize v-if="name === 'maximize'" />
    <i-fluency-memory v-if="name === 'memory'" />
    <i-fluency-minimize v-if="name === 'minimize'" />
    <i-fluency-unmaximize v-if="name === 'unmaximize'" />
    <i-fluency-nas v-if="name === 'nas'" />
    <i-fluency-notes v-if="name === 'notes'" />
    <i-fluency-ping v-if="name === 'ping'" />
    <i-fluency-plus v-if="name === 'plus'" />
    <i-fluency-processes v-if="name === 'processes'" />
    <i-fluency-processor v-if="name === 'processor'" />
    <i-fluency-services v-if="name === 'services'" />
    <i-fluency-settings v-if="name === 'settings'" />
    <i-fluency-tag v-if="name === 'tag'" />
    <i-fluency-tasks v-if="name === 'tasks'" />
    <i-fluency-terminal v-if="name === 'terminal'" />
    <i-fluency-up v-if="name === 'up'" />
    <i-fluency-user v-if="name === 'user'" />
    <i-fluency-zap v-if="name === 'zap'" />
    <i-fluency-status v-if="name === 'status'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
