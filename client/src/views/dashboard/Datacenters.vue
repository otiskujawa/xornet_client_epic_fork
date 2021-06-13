<template>
  <div class="datacenters">
    <div class="buttons" v-if="!route">
      <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of datacenters" :key="datacenter" />
      <DatacenterButton :addButton="true" @click="isAddingNew = !isAddingNew" />
      <DatacenterCard v-if="isAddingNew" />
    </div>
    <div v-else-if="datacenter" class="content">
      <div class="heading">
        <img class="banner" :src="datacenter.banner || 'https://i.redd.it/cxrn0h5ksd131.jpg'" :alt="datacenter.name" />
        <Icon class="datacenterEdit bannerPen" @click="$refs.banner.click()" v-if="isEditing" icon="edit" />
        <img class="logo" :class="{isEditing}" :src="datacenter.logo || 'https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif'" :alt="datacenter.name" />
        <Icon class="datacenterEdit logoPen" @click="$refs.logo.click()" v-if="isEditing" icon="edit" />
      </div>
      <div class="bullshit">
        <div class="coolShit">
          <div class="buttons">
            <ShadowButton class="revoke" icon="stack" title="Add server" @click="isShowingServerCard = !isShowingServerCard" />
            <ShadowButton class="revoke" v-if="!isEditing" icon="edit" title="Edit" @click="isEditing = !isEditing" />
            <ShadowButton
              class="revoke"
              v-else
              icon="save"
              title="Save"
              @click="
                isEditing = !isEditing;
                save();
              "
            />
          </div>
          <InfoField icon="stack" title="Servers Online" color="#8676FF" :value="machines.size || 0" :maxValue="stats.totalMachines" />
          <InfoField icon="network" title="Network Health" color="#01F1E3" suffix="%" :value="datacenter.networkHealth || 0"/>
          <InfoField icon="rj45" title="Current Bandiwdth" color="#FFBA69" suffix="Mbps" :value="stats.currentBandwidth?.toFixed(2) || 0" />
          <InfoField icon="ram" title="Total RAM Usage" color="#FF718C" suffix="GB" :value="stats.ramUsage?.current?.toFixed(2) || 0" :maxValue="stats.ramUsage?.max?.toFixed(2)"/>
          <MemberField :isOwner="datacenter.owner === me._id || me.is_admin" :members="datacenter.members" />
        </div>
        <ServerCard v-if="isShowingServerCard" />
        <ServerList v-if="machines.size !== 0" :machines="Array.from(machines.values())" />
      </div>
    </div>
    <form v-if="isEditing" style="display: none">
      <input type="file" id="logo" ref="logo" name="logo" accept="image/svg+xml" />
      <input type="file" id="banner" ref="banner" name="banner" accept="image/*" />
    </form>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import socket from "@/services/socket.js";
import DatacenterCard from "@/components/misc/DatacenterCard";
import ServerCard from "@/components/misc/ServerCard";
import DatacenterButton from "@/components/dashboard/DatacenterButton";
import ServerList from "@/components/dashboard/ServerList";
import InfoField from "@/components/dashboard/InfoField";
import MemberField from "@/components/dashboard/MemberField";
import ShadowButton from "@/components/dashboard/ShadowButton";
import ColoredGauge from "@/components/dashboard/ColoredGauge";

export default {
  name: "Datacenters",
  components: {
    Icon,
    ServerList,
    ColoredGauge,
    DatacenterButton,
    ServerCard,
    DatacenterCard,
    MemberField,
    ShadowButton,
    InfoField
  },
  computed: {
    route: function() {
      return this.$route.params.name;
    },
    datacenter: function() {
      return this.datacenters.filter(datacenter => datacenter.name == this.route)[0];
    },
    me: function() {
      return JSON.parse(localStorage.getItem("me"));
    }
  },
  watch: {
    $route(to, from) {
      this.machines.clear();
      this.fetchData();
    }
  },
  data() {
    return {
      datacenters: [],
      isAddingNew: false,
      isEditing: false,
      isShowingServerCard: false,
      machines: new Map(),
      stats: {
        ramUsage: {},
        currentBandwidth: 0,
        totalMachines: 0
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.datacenters = await this.api.datacenters.fetchAll();
      this.stats.totalMachines = (await this.api.datacenters.fetchMachineCount(this.datacenter.name)).count;

      socket.on("machines", machines => {
        console.log(`%c[WS]` + `%c [Machines]`, "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;", "color: #ff77aa;", machines);

        // Temp scuff way to quickly illustrate how datacenters will show machines from them
        Object.values(machines).forEach(machine => {
          machine.uuid && machine.datacenter?._id === this.datacenter?._id ? this.machines.set(machine.uuid, machine) : null;
        });

        // Reset the values to zero :kekw:
        this.stats.ramUsage.current = 0;
        this.stats.ramUsage.max = 0;
        this.stats.currentBandwidth = 0;
        // Put the current values into variables
        this.machines.forEach(machine => {
          this.stats.ramUsage.current += machine.ram.used;
          this.stats.ramUsage.max += machine.ram.total;
          this.stats.currentBandwidth += machine.network.TxSec + machine.network.RxSec;
        });
      });
    },
    async save() {
      let response = await this.api.datacenters.save(this.$route.params.name, this.$refs.logo.files[0], this.$refs.banner.files[0]);

      // this.profile.profileImage = response.profile.profileImage;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    }
  }
};
</script>

<style scoped>
.datacenters {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 8px;
}
.datacenters .buttons {
  display: flex;
  gap: 8px;
}
.datacenters .content {
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 128px;
}

.datacenters .content .bullshit {
  display: flex;
  gap: 8px;
  width: 100%;
}

.datacenters .heading {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 128px;
  min-height: 128px;
}

.datacenters .heading img {
  user-select: none;
  max-height: 80%;
}

.datacenters .heading .banner {
  width: 100%;
  min-height: 128px;
  height: 128px;
  position: absolute;
  top: 0;
  filter: grayscale(1);
  opacity: 15%;
  object-fit: cover;
  position: absolute;
}

.datacenters .heading .logo {
  z-index: 2;
  filter: invert(var(--filter));
}
.datacenters .heading .logo.isEditing { 
  opacity: 0.50;
}

.datacenters .heading .datacenterEdit {
  cursor: pointer;
  transition: 100ms ease;
  position: absolute;
  transform: translate(50%, -50%);
  filter: invert(1);
}

.datacenters .heading .datacenterEdit.bannerPen {
  width: 32px;
  top: 24px;
  right: 24px;
}
.datacenters .heading .datacenterEdit.bannerPen:hover {
  width: 40px;
}
.datacenters .heading .datacenterEdit.bannerPen:active {
  width: 28px;
}
.datacenters .heading .datacenterEdit.logoPen {
  width: 64px;
  z-index: 5000;
  top: 50%;
  right: 50%;
}
.datacenters .heading .datacenterEdit.logoPen:hover {
  width: 72px;
}
.datacenters .heading .datacenterEdit.logoPen:active {
  width: 56px;
}

.datacenters .content .coolShit {
  width: 268px;
  min-width: 268px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.datacenters .content .coolShit {
  width: 268px;
  min-width: 268px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.datacenters .content .coolShit .members {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 128px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.datacenters .content .coolShit .buttons {
  display: flex;
  justify-content: space-between;
}
</style>
