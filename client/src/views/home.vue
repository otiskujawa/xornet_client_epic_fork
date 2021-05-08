<template>
  <div class="view home">
    <logo/>
    <fieldset v-for="vm of vms" :key="vm" class="vm">
      <legend>{{vm.name}}</legend>
      <gauge :icon="require('@/assets/icons/cpu.png')" suffix="%" :value="parseFloat(vm.cpu)"/>
      <gauge :icon="require('@/assets/icons/ram.png')" suffix="GB" :value="parseFloat(vm.ram)" :maxValue="64"/>
      <gauge :icon="require('@/assets/icons/upload.png')" suffix="mbps" :value="parseFloat(vm.upload)" :maxValue="1000"/>
      <gauge :icon="require('@/assets/icons/download.png')" suffix="mbps" :value="parseFloat(vm.download)" :maxValue="1000"/>
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
      console.log(vms);
      this.vms = vms;
    });
  },
}
</script>

<style scoped>
.vm {
  display: flex;
  flex-direction: row;
  padding: 0px 16px 20px 16px;

  border: 1px solid var(--dark-lighter);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--dark-light);
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

