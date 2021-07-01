<template>
  <div class="datacenters p-2 w-full h-full overflow-scroll">
    <div class="datacenterButtons flex w-full flex-col h-full" v-if="!route">
      <h1 class=" font-bold p-2 text-2xl">My Datacenters</h1>
      <div class="buttons grid gap-2 w-full">
        <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of myDatacenters" :key="datacenter" />
        <DatacenterButton :addButton="true" @click="isAddingNew = !isAddingNew" />
        <Dialog v-model="isAddingNew">
          <DatacenterCard />
          <!-- <AddDatacenter /> -->
        </Dialog>
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div v-for="i in [...Array(10).keys()]"></div>
      </div>
      <h1 class=" font-bold p-2 text-2xl" v-if="sharedDatacenters">Shared Datacenters</h1>
      <div class="buttons w-full">
        <DatacenterButton
          class="datacenter"
          :datacenter="datacenter"
          v-for="datacenter of sharedDatacenters"
          :key="datacenter"
        />
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div v-for="i in [...Array(10).keys()]"></div>
      </div>
      <h1 class=" font-bold p-2 text-2xl" v-if="me?.is_admin">Other Datacenters</h1>
      <div class="buttons w-full">
        <DatacenterButton
          class="datacenter"
          :datacenter="datacenter"
          v-for="datacenter of otherDatacenters"
          :key="datacenter"
        />
        <!-- nanahira pls help us fix the stupid grid this is cancer -->
        <div v-for="i in [...Array(10).keys()]"></div>
      </div>
    </div>
    <div v-else-if="datacenter" class="flex gap-2 flex-col mb-32">
      <div class="flex gap-2 p-2 w-full flex-col md:flex-row">
        <div class="w-268px min-w-268px flex flex-col gap-2">
          <div class="flex flex-col gap-2">
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
            <div class="grid grid-cols-2 gap-2">
              <ShadowButton icon="stack" title="Add server" @click="isShowingServerCard = !isShowingServerCard" />
              <ShadowButton v-if="!isEditing" icon="edit" title="Edit" @click="isEditing = !isEditing" />
              <ShadowButton
                v-else
                icon="save"
                title="Save"
                @click="
                  isEditing = !isEditing;
                  save();
                "
              />
              <ShadowButton
                icon="bookmark"
                v-if="datacenter._id !== me.primaryDatacenter"
                title="Make Primary"
                @click="setPrimary()"
              />
              <ShadowButton class="primary" icon="bookmark" v-else title="Primary" />
              <ShadowButton class="delete" icon="trash" title="Delete" @click="deleteDatacenter()" />
              <ShadowButton icon="qr" title="Make QR" @click="qrDialogOpen = true"/>
              <Dialog v-model="qrDialogOpen">
                <QRDialog :name="datacenter.name"></QRDialog>
              </Dialog>
            </div>
          </div>

          <div class="infoFields grid gap-2">
            <MultiGauge
              class="justify-self-center"
              :logo="datacenter.logo"
              :colors="['#8676FF', '#516DFF', '#32B5FF', '#4ADEFF']"
              :values="[
                machines.length || 0,
                machines.length !== 0 ? (machines.reduce((a, b) => a + b.ping, 0) / machines.length).toFixed(2) : 0,
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
              :value="machines.length || 0"
              :maxValue="stats.totalMachines"
            />
            <InfoField
              borderless
              icon="network"
              title="Average Ping"
              color="#516DFF"
              suffix="ms"
              :value="machines.length !== 0 ? (machines.reduce((a, b) => a + b.ping, 0) / machines.length).toFixed(2) : 0"
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
        <ServerList v-if="machines.length !== 0" :machines="machines" />
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
import ServerCard from "@/components/misc/ServerCard";
import DatacenterButton from "@/components/dashboard/DatacenterButton";
import ServerList from "@/components/dashboard/ServerList";
import InfoField from "@/components/dashboard/InfoField";
import MemberField from "@/components/dashboard/MemberField";
import ShadowButton from "@/components/dashboard/ShadowButton";
import DatacenterCard from "@/components/misc/DatacenterCard";
import MultiGauge from "@/components/dashboard/MultiGauge";
import Dialog from "@/components/library/Dialog.vue";
import QRDialog from "@/components/dashboard/QRDialog"
import Card from "@/components/library/Card.vue";
import AddDatacenter from "@/components/dashboard/AddDatacenter.vue";
import { appState } from "@/states/appState";

export default {
  name: "Datacenters",
  components: {
    Icon,
    AddDatacenter,
    ServerList,
    DatacenterButton,
    ServerCard,
    DatacenterCard,
    MemberField,
    ShadowButton,
    InfoField,
    Dialog,
    MultiGauge,
    Card,
    QRDialog,
  },
  data() {
    return {
      datacenters: [],
      isAddingNew: false,
      isEditing: false,
      isPrimary: false,
      isShowingServerCard: false,
      totalMachines: 0,
      qrDialogOpen: false,
    };
  },
  computed: {
    me() {
      return appState.getMe();
    },
    route() {
      return this.$route.params.name;
    },
    machines() {
      const machines = Array.from(appState.getMachines().values());
      return this.route ? machines.filter(machine => machine.datacenter?.name == this.route) : machines;
    },
    datacenter() {
      return this.datacenters.filter(datacenter => datacenter.name == this.route)[0];
    },
    myDatacenters() {
      return this.datacenters.filter(datacenter => datacenter.owner === this.me._id);
    },
    sharedDatacenters() {
      return this.datacenters.filter(
        datacenter => datacenter.members.map(member => member._id).includes(this.me._id) && datacenter.owner !== this.me._id
      );
    },
    otherDatacenters() {
      return this.datacenters.filter(
        datacenter => !datacenter.members.map(member => member._id).includes(this.me._id) && datacenter.owner !== this.me._id
      );
    },
    stats() {
      const machines = Array.from(this.machines.values()).filter(machine => machine.datacenter?._id === this.datacenter?._id);
      return {
        ramUsage: {
          current: machines.reduce((acc, machine) => acc + machine.ram.used, 0),
          max: machines.reduce((acc, machine) => acc + machine.ram.total, 0)
        },
        currentBandwidth: machines.reduce((acc, machine) => acc + (machine.network.TxSec + machine.network.RxSec), 0),
        totalMachines: this.totalMachines
      };
    }
  },
  watch: {
    async $route(to, from) {
      this.me = appState.getMe();
      this.datacenters = await this.api.datacenter.fetchAll();
      this.datacenter ? (this.totalMachines = (await this.api.datacenter.fetchMachineCount(this.datacenter._id)).count) : null;
    }
  },
  async mounted() {
    this.datacenters = await this.api.datacenter.fetchAll();
  },
  methods: {
    async save() {
      let response = await this.api.datacenter.save(
        this.$route.params.name,
        this.$refs.logo.files[0],
        this.$refs.banner.files[0]
      );

      // Update profile changes
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    },
    async setPrimary() {
      await this.api.user.setPrimaryDatacenter(this.datacenter._id);
      await this.api.user.syncMe();
      this.datacenters = await this.api.datacenter.fetchAll();
    },
    async deleteDatacenter() {
      const response = await this.api.datacenter.remove(this.datacenter._id);
      if (response.status == 200) this.$router.push(`/dashboard/datacenters`);
    }
  }
};
</script>

<style lang="postcss" scoped>
.datacenters .buttons {
  @apply grid gap-2;
  grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
}

.infoFields {
  grid-template-columns: 100%;
}

.buttons {
  @apply gap-2 flex content-between;
}

.heading {
  @apply relative items-center rounded overflow-hidden w-full justify-center h-32 p-2 min-h-32;
}
.heading img {
  @apply select-none max-h-80/100;
}
.banner {
  @apply w-full min-h-32 h-32 absolute top-0 filter grayscale-1 opacity-15 object-cover;
}
.logo {
  @apply z-2;
  filter: invert(var(--filter));
}
.logo.isEditing {
  @apply opacity-50;
}
.datacenterEdit {
  @apply cursor-pointer transition duration-100 ease absolute transform translate-x-1/2 -translate-y-1/2 filter invert;
}
.datacenterEdit.bannerPen {
  @apply w-8 top-6 right-6;
}
.datacenterEdit.bannerPen:hover {
  @apply w-10;
}
.datacenterEdit.bannerPen:active {
  @apply w-7;
}
.datacenterEdit.logoPen {
  @apply w-16 z-5000 top-1/2 right-1/2;
}
.datacenterEdit.logoPen:hover {
  @apply w-20;
  width: 72px;
}
.datacenterEdit.logoPen:active {
  @apply w-14;
}
</style>
