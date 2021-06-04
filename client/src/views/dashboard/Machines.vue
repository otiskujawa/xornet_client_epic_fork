<template>
  <div class="machines">
    <ServerList :machines="Array.from(machines.values())" />
    <div class="content">
      <div class="machines">
        <GaugeField v-if="machines.get(selectedMachine)" :machine="machines.get(selectedMachine)" />
      </div>

      <!-- <Terminal/> -->

      <!-- <div class="informatics">
          <InfoField title="Total RAM" :value="totalRamUsed + 'GB / ' + totalRam + 'GB'"/>
          <InfoField title="Total Upload Throughput" :value="totalUploadThroughput + 'mbps'"/>
          <InfoField title="Total Download Throughput" :value="totalDownloadThroughput + 'mbps'"/>
        </div> -->

      <!-- Disabled temp due to it causing lag when developing -->
      <!-- <Chart :key="totalUpload[totalUpload.length - 2] + 'upload'" :identity="totalUpload[totalUpload.length - 2] + 'upload'" :type="'line'" :data="{
          labels: labels,
          datasets: [
            {
              label: 'Upload',
              data: totalUpload,
              borderColor: '#ff0062',
              backgroundColor: '#ff458caa'
            },
          ]}"//>
        <Chart :key="totalDownload[totalDownload.length - 1] + 'download'" :identity="totalDownload[totalDownload.length - 1] + 'download'" :type="'line'" :data="{
          labels: labels,
          datasets: [
            {
              label: 'Download',
              data: totalDownload,
              borderColor: '#00c8ff',
              backgroundColor: '#52daffaa'
            },
          ]}"/> -->
    </div>
  </div>
</template>

<script>
import socket from "@/services/socket.js";
import GaugeField from "@/components/dashboard/GaugeField";
import InfoField from "@/components/dashboard/InfoField";
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";

export default {
  name: "Machines",
  components: {
    InfoField,
    GaugeField,
    Terminal,
    Nav,
    Header,
    Chart,
    LoadingScreen,
    ServerList
  },
  computed: {
    selectedMachine: function() {
      return this.$route.params.machine;
    }
  },
  data: () => {
    return {
      machines: new Map(),
      totalRam: null,
      totalDownloadThroughput: null,
      totalUploadThroughput: null,
      totalDownload: [],
      totalUpload: [],
      labels: []
    };
  },
  mounted() {
    if (this.$route.query.newMachine) this.api.user.addMachine(this.$route.query.newMachine);

    socket.on("machines", machines => {
      // console.log(machines);

      Object.values(machines).forEach(machine => (machine.uuid ? this.machines.set(machine.uuid, machine) : null));

      let totalRam = 0;
      let totalRamUsed = 0;
      let totalDownloadThroughput = 0;
      let totalUploadThroughput = 0;
      for (let machine of Object.values(machines)) {
        totalRam = totalRam + Math.ceil(machine.ram.total);
        totalRamUsed = totalRamUsed + machine.ram.used;
        totalDownloadThroughput = totalDownloadThroughput + machine.network.RxSec;
        totalUploadThroughput = totalUploadThroughput + machine.network.TxSec;
      }
      this.totalRam = totalRam;
      this.totalRamUsed = totalRamUsed.toFixed(2);
      this.totalDownloadThroughput = totalDownloadThroughput.toFixed(2);
      this.totalUploadThroughput = totalUploadThroughput.toFixed(2);

      this.totalDownload.push(parseFloat(totalDownloadThroughput.toFixed(2)));
      this.totalUpload.push(parseFloat(totalUploadThroughput.toFixed(2)));
      this.labels.push(`${new Date().getHours()}:${new Date().getMinutes()}`);

      if (this.totalDownload.length > 50) {
        this.totalDownload.shift();
        this.totalUpload.shift();
        this.labels.shift();
      }
    });
  }
};
</script>

<style scoped>
.machines {
  width: 100%;
  height: 100%;
}
</style>
