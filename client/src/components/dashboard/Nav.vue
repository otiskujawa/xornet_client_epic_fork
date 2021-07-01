<template>
  <nav class="buttons bg-gray-300 h-full max-w-min items-center flex flex-col content-between relative">
    <Tooltip sideways text="Profile">
      <SquareButton boxless class="firstButton" icon="user" :to="{ name: 'profile', params: { username } }" />
    </Tooltip>

    <Tooltip sideways text="Machines">
      <SquareButton boxless icon="stack" :to="{ name: 'machines', params: { view: 'all' } }" />
    </Tooltip>

    <Tooltip sideways text="Datacenters">
      <SquareButton boxless icon="datacenter" :to="{ name: 'datacenters' }" />
    </Tooltip>

    <Tooltip sideways text="Logs">
      <SquareButton boxless icon="clipboard" :to="{ name: 'logs' }" />
    </Tooltip>

    <Tooltip sideways text="Downloads">
      <SquareButton boxless icon="downloads" :to="{ name: 'downloads' }" />
    </Tooltip>

    <Tooltip sideways text="Settings">
      <SquareButton boxless class="settings" icon="settings" :to="{ name: 'settings' }" />
    </Tooltip>
  </nav>
</template>

<script>
import SquareButton from "@/components/dashboard/SquareButton";
import Tooltip from "@/components/dashboard/Tooltip.vue";

export default {
  name: "MobileNav",
  components: {
    SquareButton,
    Tooltip
  },
  computed: {
    username() {
      return localStorage.getItem("username");
    }
  }
};
</script>

<style lang="postcss" scoped>
@media only screen and (max-width: 600px) {
  nav#desktopNav {
    display: none;
  }
  nav#mobileNav {
    display: flex;
    width: 100%;
  }
}

@media only screen and (min-width: 600px) {
  nav#desktopNav {
    display: flex;
  }
  nav#mobileNav {
    display: none;
  }
}

nav:not(#mobileNav) .top .firstButton {
  overflow: hidden;
}

nav#mobileNav .top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 48px;
}
</style>
