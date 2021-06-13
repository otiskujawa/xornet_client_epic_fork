<template>
  <div class="machines">
    <ServerList :machines="Array.from(machines.values())" />
    <div class="content">
      <div class="machines">
        <GaugeField v-if="machines.get(selectedMachine)" :machine="machines.get(selectedMachine)" />

        <Chart
          v-if="uploadGraph.length != 0"
          :key="labels[2]"
          :identity="labels[2]"
          :type="'line'"
          :data="{
            labels: labels,
            datasets: [
              {
                label: 'Download',
                data: downloadGraph,
                borderColor: '#00c8ff',
                backgroundColor: '#52daffaa'
              }
            ]
          }"
        />
        <Chart
          v-if="uploadGraph.length != 0"
          :key="labels[2] + 'up'"
          :identity="labels[2] + 'up'"
          :type="'line'"
          :data="{
            labels: labels,
            datasets: [
              {
                label: 'Upload',
                data: uploadGraph,
                borderColor: '#ff0062',
                backgroundColor: '#ff458caa'
              }
            ]
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import socket from "@/services/socket.js";
import GaugeField from "@/components/dashboard/GaugeField";
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";

export default {
  name: "Machines",
  components: {
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
      downloadGraph: [],
      uploadGraph: [],
      labels: []
    };
  },
  methods: {
    async getNetwork() {
      const networkData = await this.api.machine.getNetwork(this.selectedMachine);
      this.downloadGraph = networkData.map(entity => entity.network.RxSec);
      this.uploadGraph = networkData.map(entity => entity.network.TxSec);
      this.labels = networkData.map(entity => {
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        return `${hour}:${minute}:${second}`;
      });
    }
  },
  watch: {
    selectedMachine: async function() {
      if (this.selectedMachine) this.getNetwork();
    }
  },
  async mounted() {
    if (this.$route.query.newMachine) {
      this.api.user.addMachine(this.$route.query.newMachine);
    }

    if (this.selectedMachine) this.getNetwork();

    socket.on("machines", machines => {
      console.log(`%c[WS]` + `%c [Machines]`, "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;", "color: #ff77aa;", machines);

      Object.values(machines).forEach(machine => (machine.uuid ? this.machines.set(machine.uuid, machine) : null));

      // this.labels.push(`${new Date().getHours()}:${new Date().getMinutes()}`);
    });
  }
};
</script>

<style scoped>
.machines {
  width: 100%;
  height: 100vh;
  margin-bottom: 128px;
}
</style>
