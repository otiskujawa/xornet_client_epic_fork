<template>
  <nav class="serverList">
    <nav v-if="thinButtons" id="desktop" class="columns" :class="{ thin: thinButtons }">
      <div @click="sort('hostname')" class="field hostname">hostname <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'hostname'" /></div>
      <div @click="sort('uuid')" class="field uuid">uuid <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'uuid'" /></div>
      <div @click="sort('cpu')" class="field cpuUsage">cpu <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'cpu'" /></div>
      <div @click="sort('ram')" class="field ramUsage">ram <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'ram'" /></div>
      <div @click="sort('disks')" class="field disksUsage">disks <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'disks'" /></div>
      <div @click="sort('upload')" class="field networkUsage">Upload <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'upload'" /></div>
      <div @click="sort('download')" class="field networkUsage">Download <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'download'" /></div>
      <div @click="sort('region')" class="field region">Region <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'region'" /></div>
      <div @click="sort('ping')" class="field ping">ping <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'ping'" /></div>
      <div @click="sort('uptime')" class="field uptime">uptime <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'uptime'" /></div>
      <div @click="sort('owner')" class="field owner">owner <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'owner'" /></div>
      <div @click="sort('datacenter')" class="field datacenter">datacenter <img :src="sortingDirection ? chevronUp : chevronDown" v-if="sortingMethod == 'datacenter'" /></div>
    </nav>

    <section v-if="!thinButtons">
      <Icon icon="master" />
      <h1>Physical Machines</h1>
    </section>

    <div class="list">
      <MachineButton id="mobile" :machine="machine" v-for="machine of showRogues ? sortedMachines : sortedMachines.filter(machine => !machine.rogue)" :key="machine" />
      <ServerListButton id="desktop" :thin="thinButtons" :showDetails="showDetails" :machine="machine" v-for="machine of showRogues ? sortedMachines : sortedMachines.filter(machine => !machine.rogue)" :key="machine" />
    </div>
  </nav>
</template>

<script>
import ServerListButton from "@/components/dashboard/ServerListButton";
import MachineButton from "@/components/dashboard/MachineButton";
import Icon from "@/components/misc/Icon";
export default {
  name: "ServerList",
  computed: {
    isSmall: function() {
      return this.$route.params.machine ? true : false;
    },
    settings: function() {
      if (localStorage.settings) return JSON.parse(localStorage.settings);
    },
  },
  data() {
    return {
      chevronUp: require("@/assets/icons/filled/chevron-up.svg"),
      chevronDown: require("@/assets/icons/filled/chevron-down.svg"),
      thinButtons: true,
      showRogues: true,
      showDetails: false,
      sortingMethod: "hostname",
      sortingDirection: true,
      sortedMachines: []
    };
  },
  components: {
    Icon,
    MachineButton,
    ServerListButton
  },
  props: {
    machines: { type: Object, required: false }
  },
  watch: {
    machines(to, from) {
      this.switchSorting(this.sortingMethod);
    },
    sortingMethod(to, from) {
      this.switchSorting(to, from);
    },
    sortingDirection(to, from) {
      this.switchSorting(this.sortingMethod);
    }
  },
  methods: {
    sort(field) {
      if (field == this.sortingMethod) this.sortingDirection = !this.sortingDirection;
      else this.sortingDirection = false;
      this.sortingMethod = field;
    },
    switchSorting(sortBy) {
      const sortingAlgorithms = {
        hostname: (a, b) => {
          if (a.hostname < b.hostname || b.hostname == "" || !b.hostname) return -1;
          if (a.hostname > b.hostname) return 1;
          return 0;
        },
        uuid: (a, b) => {
          if (a.uuid < b.uuid) return -1;
          if (a.uuid > b.uuid) return 1;
          return 0;
        },
        cpu: (a, b) => {
          if (a.cpu < b.cpu) return -1;
          if (a.cpu > b.cpu) return 1;
          return 0;
        },
        ram: (a, b) => {
          if (a.ram.used < b.ram.used) return -1;
          if (a.ram.used > b.ram.used) return 1;
          return 0;
        },
        disks: (a, b) => {
          if (a.disks.reduce((a, b) => a + b.use, 0) < b.disks.reduce((a, b) => a + b.use, 0)) return -1;
          if (a.disks.reduce((a, b) => a + b.use, 0) > b.disks.reduce((a, b) => a + b.use, 0)) return 1;
          return 0;
        },
        upload: (a, b) => {
          if (a.network.TxSec < b.network.TxSec) return -1;
          if (a.network.TxSec > b.network.TxSec) return 1;
          return 0;
        },
        download: (a, b) => {
          if (a.network.RxSec < b.network.RxSec) return -1;
          if (a.network.RxSec > b.network.RxSec) return 1;
          return 0;
        },
        region: (a, b) => {
          if (a.geolocation.countryCode < b.geolocation.countryCode) return -1;
          if (a.geolocation.countryCode > b.geolocation.countryCode) return 1;
          return 0;
        },
        ping: (a, b) => {
          if (a.ping < b.ping || isNaN(b.ping)) return -1;
          if (a.ping > b.ping) return 1;
          return 0;
        },
        uptime: (a, b) => {
          if (a.uptime.pure < b.uptime.pure) return -1;
          if (a.uptime.pure > b.uptime.pure) return 1;
          return 0;
        },
        owner: (a, b) => {
          if (a.owner.username < b.owner.username) return -1;
          if (a.owner.username > b.owner.username) return 1;
          return 0;
        },
        datacenter: (a, b) => {
          if (a.datacenter?.name < b.datacenter?.name || b.datacenter?.name == "" || !b.datacenter) return -1;
          if (a.datacenter?.name > b.datacenter?.name) return 1;
          return 0;
        }
      };

      let sortedArray = this.machines.sort((a, b) => sortingAlgorithms[sortBy](a, b));

      if (!this.sortingDirection) this.sortedMachines = sortedArray.reverse();
      this.sortedMachines = sortedArray;
    }
  }
};
</script>

<style scoped>
.serverList {
  width: 100%;
  border-radius: 4px;
  height: 100%;
  flex-direction: column;
  font-family: "Roboto Mono";
  background-color: var(--background-color);
  transition: 200ms ease;
  overflow-x: hidden;
}
.serverList.small {
  width: 320px;
  min-width: 320px;
}
.serverList .heading {
  width: 100%;
  padding: 8px 0px;
  display: flex;
  justify-content: space-between;
}
.serverList section {
  height: 32px;
  width: 100%;
  display: flex;
  padding: 8px;
  gap: 8px;
}
.serverList section img {
  height: 16px;
  filter: invert(var(--filter));
}
.serverList section h1 {
  text-transform: uppercase;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 117.9%;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--slyColor);
}
.serverList .list {
  flex-direction: column;
  margin-bottom: 128px;
  display: flex;
  gap: 2px;
}
.serverList .columns {
  padding: 8px;
  background-color: var(--background-color);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  display: flex;
  gap: 8px;
  transition: 100ms ease;

  overflow: hidden;
  user-select: none;
}
.serverList .columns .field,
.serverList .columns .field strong {
  font-weight: 400;
  font-size: 11px;
  font-family: Work Sans, sans-serif;
  color: var(--slyColor);
  min-width: fit-content;
  text-align: left;
}
.serverList .columns .field {
  text-align: center;
  display: flex;
  align-items: center;
  min-width: 72px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
}
.serverList .columns .field:hover {
  color: var(--theme-color);
}
.serverList .columns .field img {
  width: 8px;
  filter: invert(var(--filter));
  margin-left: 8px;
}
.serverList .columns .field.cpuUsage {
  margin-left: 32px;
  min-width: 48px;
}
.serverList .columns .field.hostname {
  margin-left: 24px;
  min-width: 100px;
}
.serverList .columns .field.uuid {
  margin-left: 24px;
  min-width: 216px;
  justify-content: flex-end;
}
.serverList .columns .field.region {
  min-width: 48px;
}
.serverList .columns .field.disksUsage {
  min-width: 138px;
}
.serverList .columns .field.networkUsage {
  min-width: 86px;
}
.serverList .columns .field.region {
  min-width: 66px;
}
.serverList .columns .field.uptime {
  min-width: 100px;
}
.serverList .columns .field.owner {
  min-width: 124px;
}
</style>
