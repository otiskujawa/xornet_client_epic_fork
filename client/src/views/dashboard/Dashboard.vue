<template>
  <div class="view dashboard">
    <LoadingScreen :isLoaded="!isLoading" />
    <Header v-if="!isLoading" />
    <div class="main">
      <Nav id="desktopNav" />
      <router-view></router-view>
    </div>
    <Nav id="mobileNav" />
  </div>
</template>

<script>
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";

export default {
  name: "Dashboard",
  components: {
    Nav,
    Header,
    LoadingScreen
  },
  computed: {
    isLoading: function() {
      return false;
    }
  }
};
</script>

<style scoped>
.dashboard {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  align-items: flex-start;
  display: flex;
  width: 100%;
  height: calc(100vh - 48px);
}

@media only screen and (max-width: 600px) {
  .main {
    height: calc(100vh - 96px);
  }
}

.content {
  box-sizing: border-box;
  background-color: var(--white);
  padding: 8px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  border-radius: 4px 0px 0px 0px;
}

.machines,
.informatics {
  display: flex;
  width: fit-content;
  flex-direction: row;
}

.informatics {
  gap: 8px;
}
</style>
