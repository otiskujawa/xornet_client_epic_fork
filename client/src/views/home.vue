<template>
  <div class="view home">
    <logo/>
    <gaugeField :vm="vm" v-for="vm of vms" :key="vm"/>
    {{totalRam}}
  </div>
</template>

<script>
import socket from '@/services/socket.js';
import logo from '@/components/logo';
import gaugeField from '@/components/gaugeField';

export default {
  name: 'home',
  components: {
    gaugeField,
    logo
  },
  data: () => {
    return {
      vms: {},
      totalRam: null,
    }
  },
  mounted(){
    socket.on("vms", vms => {
      console.log(vms);
      this.vms = vms;
 
      let totalRam = 0; 
      for(let vm of vms){
        totalRam = totalRam + Math.ceil(vm.ram.total);
      }
      this.totalRam = totalRam
    });
  },
}
</script>

<style scoped>


</style>

