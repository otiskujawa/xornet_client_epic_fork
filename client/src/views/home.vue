<template>
  <div class="view home">
    <serverList :vms="vms"/>

    <div class="informatics">
      <infoField title="Total RAM" :value="totalRam + 'GB'"/>
      <infoField title="Total Network Throughput" :value="totalThroughput + 'mbps'"/>
    </div>
    <div class="vms">
      <gaugeField :vm="vm" v-for="vm of vms" :key="vm"/>
    </div>
  </div>
</template>

<script>
import socket from '@/services/socket.js';
import gaugeField from '@/components/gaugeField';
import infoField from '@/components/infoField';
import serverList from '@/components/serverList';

export default {
  name: 'home',
  components: {
    infoField,
    gaugeField,
    serverList,

  },
  data: () => {
    return {
      vms: {},
      totalRam: null,
      totalThroughput: null,
    }
  },
  mounted(){
    socket.on("vms", vms => {
      console.log(vms);
      this.vms = vms;
 
      let totalRam = 0; 
      let totalThroughput = 0;
      for(let vm of vms){
        totalRam = totalRam + Math.ceil(vm.ram.total);
        totalThroughput = totalThroughput + vm.network.TxSec + vm.network.RxSec;
      }
      this.totalRam = totalRam;
      this.totalThroughput = totalThroughput.toFixed(2);
    });
  },
}
</script>

<style scoped>

.home {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  height: 100%;
}

.vms, .informatics {
  display: flex;
  flex-direction: column;
}

.informatics {
  margin-top: 8px;
  gap: 8px;
}

</style>

