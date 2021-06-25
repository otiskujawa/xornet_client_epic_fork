<template>
  <nav class="buttons bg-gray-200 h-full items-center flex flex-col content-between relative">
    <div class="top">
      <SquareButton boxless class="firstButton" icon="user" :to="{ name: 'profile', params: { username } }" />
      <!-- <SquareButton icon="dashboard" :to="{ name: 'summary' }" /> -->
      <SquareButton boxless icon="stack" :to="{ name: 'machines' }" />
      <SquareButton boxless icon="datacenter" :to="{ name: 'datacenters' }" />
      <!-- <SquareButton icon="network" :to="{ name: 'network' }" /> -->
      <SquareButton boxless icon="clipboard" :to="{ name: 'logs' }" />
      <SquareButton boxless icon="downloads" :to="{ name: 'downloads' }" />
      <SquareButton boxless class="settings" icon="settings" :to="{ name: 'settings' }" />
    </div>
  </nav>
</template>

<script>
import SquareButton from "@/components/dashboard/SquareButton";

export default {
  name: "MobileNav",
  components: {
    SquareButton
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
