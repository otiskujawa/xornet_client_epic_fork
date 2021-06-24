<template>
  <div class="datacenters">
    <div class="datacenterButtons flex w-full flex-col h-full" v-if="!route">
      <h1 class="text-left font-bold p-2 text-2xl">My Datacenters</h1>
      <div class="buttons w-full">
        <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of myDatacenters" :key="datacenter" />
        <DatacenterButton :addButton="true" @click="isAddingNew = !isAddingNew" />
        <DatacenterCard v-if="isAddingNew" />
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 class="text-left font-bold p-2 text-2xl" v-if="sharedDatacenters">Shared Datacenters</h1>
      <div class="buttons w-full">
        <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of sharedDatacenters" :key="datacenter" />
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 class="text-left font-bold p-2 text-2xl" v-if="me?.is_admin">Other Datacenters</h1>
      <div class="buttons w-full">
        <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of otherDatacenters" :key="datacenter" />
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else-if="datacenter" class="content">
      <div class="bullshit flex-col md:flex-row">
        <div class="coolShit">
          <div class="left flex gap-2">
            <div class="datacenterTitle" style="display: flex; gap: 8px;">
              <Icon icon="datacenter" style="width: 24px;" />
              <h1 class="datacenterName" style="font-size: 20px;">{{ datacenter.name }}</h1>
            </div>
            <div class="heading hidden md:flex">
              <img class="banner" :src="datacenter.banner || 'https://i.redd.it/cxrn0h5ksd131.jpg'" :alt="datacenter.name" />
              <Icon class="datacenterEdit bannerPen" @click="$refs.banner.click()" v-if="isEditing" icon="edit" />
              <img v-if="datacenter.logo" class="logo" :class="{ isEditing }" :src="datacenter.logo" :alt="datacenter.name" />
              <Icon v-else class="logo" :class="{ isEditing }" icon="datacenter" />
              <Icon class="datacenterEdit logoPen" @click="$refs.logo.click()" v-if="isEditing" icon="edit" />
            </div>
            <div class="buttons">
              <ShadowButton
                class="revoke"
                icon="stack"
                title="Add server"
                @click="isShowingServerCard = !isShowingServerCard"
              />
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
              <ShadowButton class="revoke" icon="bookmark" v-if="datacenter._id !== me.primaryDatacenter" title="Make Primary" @click="setPrimary()"/>
              <ShadowButton class="revoke primary" icon="bookmark" v-else title="Primary"/>
              <ShadowButton class="revoke delete" icon="trash" title="Delete Datacenter" @click="deleteDatacenter()"/>
            </div>
          </div>

          <div class="infoFields">
            <MultiGauge
              :logo="datacenter.logo"
              :colors="['#8676FF', '#516DFF', '#32B5FF', '#4ADEFF']"
              :values="[
                machines.size || 0,
                machines.size !== 0
                  ? (
                      Array.from(machines.values()).reduce((a, b) => a + b.ping, 0) / Array.from(machines.values()).length
                    ).toFixed(2)
                  : 0,
                parseFloat(stats.ramUsage?.current?.toFixed(2)) || 0,
                parseFloat(stats.currentBandwidth?.toFixed(2)) || 0
              ]"
              :maxValues="[stats.totalMachines || 100, 100, parseFloat(stats.ramUsage?.max?.toFixed(2)) || 100, 50]"
            />

            <InfoField
              borderless
              icon="stack"
              title="Servers Online"
              color="#8676FF"
              :value="machines.size || 0"
              :maxValue="stats.totalMachines"
            />
            <InfoField
              borderless
              icon="network"
              title="Average Ping"
              color="#516DFF"
              suffix="ms"
              :value="
                machines.size !== 0
                  ? (
                      Array.from(machines.values()).reduce((a, b) => a + b.ping, 0) / Array.from(machines.values()).length
                    ).toFixed(2)
                  : 0
              "
            />
            <InfoField
              borderless
              icon="ram"
              title="Total RAM Usage"
              color="#32B5FF"
              suffix="GB"
              :value="stats.ramUsage?.current?.toFixed(2) || 0"
              :maxValue="stats.ramUsage?.max?.toFixed(2)"
            />
            <InfoField
              borderless
              icon="rj45"
              title="Current Bandiwdth"
              color="#4ADEFF"
              suffix="Mbps"
              :value="stats.currentBandwidth?.toFixed(2) || 0"
              :maxValue="100"
            />
          </div>
          <MemberField
            class=" hidden md:flex"
            :isOwner="datacenter.owner === me._id || me?.is_admin"
            :members="datacenter.members"
          />
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
import MultiGauge from "@/components/dashboard/MultiGauge";

export default {
  name: "Datacenters",
  components: {
    Icon,
    ServerList,
    DatacenterButton,
    ServerCard,
    DatacenterCard,
    MemberField,
    ShadowButton,
    InfoField,
    MultiGauge
  },
  computed: {
    route() {
      return this.$route.params.name;
    },
    datacenter() {
      return this.datacenters.filter(datacenter => datacenter.name == this.route)[0];
    },
    myDatacenters(){
      return this.datacenters.filter(datacenter => datacenter.owner === this.me._id);
    },
    sharedDatacenters(){
      return this.datacenters.filter(datacenter => datacenter.members.map(member => member._id).includes(this.me._id) && datacenter.owner !== this.me._id)
    },
    otherDatacenters(){
      return this.datacenters.filter(datacenter => !datacenter.members.map(member => member._id).includes(this.me._id) && datacenter.owner !== this.me._id)
    },
  },
  watch: {
    $route(to, from) {
      this.me = JSON.parse(localStorage.getItem("me"));
      this.machines.clear();
      this.fetchData();
      this.stats = {
        ramUsage: {},
        currentBandwidth: 0,
        totalMachines: 0
      };
    }
  },
  data() {
    return {
      me: null,
      datacenters: [],
      isAddingNew: false,
      isEditing: false,
      isShowingServerCard: false,
      machines: new Map(),
      stats: {
        ramUsage: {},
        currentBandwidth: 0,
        totalMachines: 0
      },
      isPrimary: false,
    };
  },
  mounted() {
    this.fetchData();
    this.me = JSON.parse(localStorage.getItem("me"));
  },
  methods: {
    async fetchData() {
      this.datacenters = await this.api.datacenters.fetchAll();
      this.stats.totalMachines = (await this.api.datacenters.fetchMachineCount(this.datacenter._id)).count;

      socket.off("machines");
      socket.on("machines", machines => {
        console.log(
          `%c[WS]` + `%c [Machines]`,
          "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;",
          "color: #ff77aa;",
          machines
        );

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
      socket.emit("getMachines");
    },
    async save() {
      let response = await this.api.datacenters.save(
        this.$route.params.name,
        this.$refs.logo.files[0],
        this.$refs.banner.files[0]
      );

      // this.profile.profileImage = response.profile.profileImage;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    },
    async setPrimary() {
      await this.api.user.setPrimaryDatacenter(this.datacenter._id);
      this.datacenters = await this.api.datacenters.fetchAll();
      this.me = JSON.parse(localStorage.getItem("me"));
    },
    async deleteDatacenter() {
      const response = await this.api.datacenters.remove(this.datacenter._id);
      if (response.status == 200) this.$router.push(`/dashboard/datacenters`);
    },
  }
};
</script>

<style scoped>
.datacenters {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.datacenters .buttons {
  padding: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
}

.content {
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 128px;
}
.bullshit {
  display: flex;
  gap: 8px;
  padding: 8px;
  width: 100%;
}
.coolShit {
  width: 268px;
  min-width: 268px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.left {
  flex-direction: column;
  gap: 8px;
}

.infoFields {
  display: grid;
  justify-items: center;
  grid-template-columns: 100%;
  gap: 8px;
}

.info {
  width: 100%;
}

.members {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 128px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
.buttons {
  gap: 8px;
  display: flex;
  justify-content: space-between;
}
.heading {
  position: relative;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  justify-content: center;
  height: 128px;
  padding: 8px;
  min-height: 128px;
}
.heading img {
  user-select: none;
  max-height: 80%;
}
.banner {
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
.logo {
  z-index: 2;
  filter: invert(var(--filter));
}
.logo.isEditing {
  opacity: 0.5;
}
.datacenterEdit {
  cursor: pointer;
  transition: 100ms ease;
  position: absolute;
  transform: translate(50%, -50%);
  filter: invert(1);
}
.datacenterEdit.bannerPen {
  width: 32px;
  top: 24px;
  right: 24px;
}
.datacenterEdit.bannerPen:hover {
  width: 40px;
}
.datacenterEdit.bannerPen:active {
  width: 28px;
}
.datacenterEdit.logoPen {
  width: 64px;
  z-index: 5000;
  top: 50%;
  right: 50%;
}
.datacenterEdit.logoPen:hover {
  width: 72px;
}
.datacenterEdit.logoPen:active {
  width: 56px;
}
</style>
