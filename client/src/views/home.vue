<template>
  <div class="view home">
    <serverList v-if="Array.from(serverList.vms.values()).length > 0" :vms="Array.from(serverList.vms.values())" :pms="Array.from(serverList.pms.values())"/>

    <div class="informatics">
      <infoField title="Total RAM" :value="totalRamUsed + 'GB / ' + totalRam + 'GB'"/>
      <infoField title="Total Upload Throughput" :value="totalUploadThroughput + 'mbps'"/>
      <infoField title="Total Download Throughput" :value="totalDownloadThroughput + 'mbps'"/>
    </div>
    <div class="machines">
      <gaugeField :machine="machine" v-for="machine of machines" :key="machine"/>
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
      machines: [],
      serverList: {
        vms: new Map(),
        pms: new Map(),
      },
      totalRam: null,
      totalDownloadThroughput: null,
      totalUploadThroughput: null,
    }
  },
  mounted(){
    socket.on("machines", machines => {
      console.log(machines);
      
      this.addMachinesToServerList(machines);

      this.machines = machines;
      let totalRam = 0; 
      let totalRamUsed = 0; 
      let totalDownloadThroughput = 0;
      let totalUploadThroughput = 0;
      for(let machine of machines){
        totalRam = totalRam + Math.ceil(machine.ram.total);
        totalRamUsed = totalRamUsed + machine.ram.used;
        totalDownloadThroughput = totalDownloadThroughput + machine.network.RxSec;
        totalUploadThroughput = totalUploadThroughput + machine.network.TxSec;
      }
      this.totalRam = totalRam;
      this.totalRamUsed = totalRamUsed.toFixed(2);
      this.totalDownloadThroughput = totalDownloadThroughput.toFixed(2);
      this.totalUploadThroughput = totalUploadThroughput.toFixed(2);
    });
  },
  methods: {
    addMachinesToServerList(machines){
      machines.forEach(machine => {
        if (machine.static.system.virtual){
          if(!this.serverList.vms.has(machine.static.uuid.os)) this.serverList.vms.set(machine.static.uuid.os, machine);
        } else {
          if(!this.serverList.pms.has(machine.static.uuid.os)) this.serverList.pms.set(machine.static.uuid.os, machine);
        }
      });
    }
  }
}
</script>

<style scoped>

.home {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  height: 100%;
}

.machines, .informatics {
  display: flex;
  flex-direction: column;
}

.informatics {
  margin-top: 8px;
  gap: 8px;
}

</style>

