<template>
  <div class="view home">
    <logo/>

    <fieldset v-for="vm of vms" :key="vm" class="vm">
      <legend>{{vm.name}}</legend>
      <gauge :icon="require('@/assets/icons/cpu.png')" :value="vm.cpu + '%'"/>
      <gauge :icon="require('@/assets/icons/ram.png')" :value="vm.ram + 'GB'"/>
      <gauge :icon="require('@/assets/icons/upload.png')" :value="vm.upload + 'mbps'"/>
      <gauge :icon="require('@/assets/icons/download.png')" :value="vm.download + 'mbps'"/>
    </fieldset>

  </div>
</template>

<script>
import socket from '@/services/socket.js';
import logo from '@/components/logo';
import gauge from '@/components/gauge';

export default {
  name: 'home',
  components: {
    gauge,
    logo
  },
  data: () => {
    return {
      vms: {},
    }
  },
  mounted(){
    socket.on("vms", vms => {
      this.vms = vms;
    });
  },
}
</script>

<style scoped>
.vm {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;

  border: 1px solid var(--dark-lighter);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--dark-light);
  transition: 100ms ease;
}
.vm legend {
  left: 24px;
  color: white;
  text-transform: lowercase;
}

.vm:hover {
  border: 1px solid;
  border-radius: 4px;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #DB00FF 8.32%, #4D9FFF 89.64%);
}

</style>

