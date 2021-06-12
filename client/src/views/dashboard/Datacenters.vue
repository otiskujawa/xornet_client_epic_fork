<template>
  <div class="datacenters">
    <div class="buttons" v-if="!route">
      <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of datacenters" :key="datacenter" />
      <DatacenterButton :addButton="true" @click="isAddingNew = !isAddingNew"/>
      <DatacenterCard v-if="isAddingNew"/>
    </div>
    <div v-else-if="datacenter" class="content">
      <div class="heading">
        <img class="banner" :src="datacenter.banner || 'https://i.redd.it/cxrn0h5ksd131.jpg'" :alt="datacenter.name" />
        <img class="logo" :src="datacenter.logo || 'https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif'" :alt="datacenter.name" />
      </div>
      <div class="bullshit">
        <div class="coolShit">
          <MemberField :isOwner="datacenter.owner === me._id || me.is_admin" :members="datacenter.members" />
          <InfoField :icon="require('@/assets/icons/filled/stack.svg')" title="Servers Online" :value="datacenter.totalServersOnline || 0"/>
          <InfoField :icon="require('@/assets/icons/filled/network.svg')" title="Network Health" :value="`${datacenter.networkHealth || 0}%`"/>
          <InfoField :icon="require('@/assets/icons/filled/rj45.svg')" title="Current Bandiwdth" :value="`${datacenter.currentBandwidth || 0}Mbps`"/>
          <InfoField :icon="require('@/assets/icons/filled/ram.svg')" title="Total RAM Usage" :value="`${datacenter.ramUsage?.current || 0}/${datacenter.ramUsage?.max || 0}GB`"/>
        </div>

        <ServerList v-if="machines.size !== 0" :machines="Array.from(machines.values())"/> 
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import socket from "@/services/socket.js";
import DatacenterCard from "@/components/misc/DatacenterCard";
import DatacenterButton from "@/components/dashboard/DatacenterButton";
import ServerList from "@/components/dashboard/ServerList";
import InfoField from "@/components/dashboard/InfoField";
import MemberField from "@/components/dashboard/MemberField";
export default {
  name: "Datacenters",
  components: {
    Icon,
    ServerList,
    DatacenterButton,
    DatacenterCard,    
    MemberField,
    InfoField,
  },
  computed: {
    route: function() {
      return this.$route.params.name;
    },
    datacenter: function(){
      return this.datacenters.filter(datacenter => datacenter.name == this.route)[0];
    },
    me: function() {
      return JSON.parse(localStorage.getItem("me"));
    }
  },
  watch: {
    $route(to, from) {
      if (to.name) this.machines.clear();
    }
  },
  data() {
    return {
      datacenters: [],
      isAddingNew: false,
      machines: new Map(),
    };
  },
  async mounted() {
    this.datacenters = await this.api.datacenters.fetchAll();

    socket.on("machines", machines => {
      console.log(`%c[WS]` + `%c [Machines]`, "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;", "color: #ff77aa;", machines);

      // Temp scuff way to quickly illustrate how datacenters will show machines from them
      Object.values(machines).forEach(machine => {
        machine.uuid && machine.datacenter?._id === this.datacenter._id ? this.machines.set(machine.uuid, machine) : null
      });
    });
  },
};
</script>

<style scoped>
.datacenters {
  width: 100%;
}
.datacenters .buttons{
  padding: 8px;
  display: flex;
  gap: 8px;
}
.datacenters .content {
  display: flex;
  gap: 8px;
  flex-direction: column;
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
  height: 224px;
}

.datacenters .heading img {
  user-select: none;
}

.datacenters .heading .banner {
  width: 100%;
  height: 224px;
  position: absolute;
  top: 0;
  filter: grayscale(1);
  opacity: 15%;
  object-fit: cover;
  position: absolute;
}

.datacenters .heading .logo {
  z-index: 2;
  width: 224px;
  filter: invert(var(--filter));
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
  height: 224px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

</style>
