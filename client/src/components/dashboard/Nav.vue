<template>
  <nav class="buttons">
    <div class="top">
      <SquareButton boxless icon="user" :to="{ name: 'profile', params: { username } }" />
      <!-- <SquareButton icon="dashboard" :to="{ name: 'summary' }" /> -->
      <SquareButton boxless icon="stack" :to="{ name: 'machines' }" />
      <SquareButton boxless icon="datacenter" :to="{ name: 'datacenters' }" />
      <!-- <SquareButton icon="network" :to="{ name: 'network' }" /> -->
      <SquareButton boxless icon="clipboard" :to="{ name: 'logs' }" />
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
    username: function() {
      return localStorage.getItem("username");
    }
  }
};
</script>

<style scoped>

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

nav {
  height: 48px;
  display: none;
  align-items: center;
  display: flex;
  background-color: var(--background-color);
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

nav#mobileNav .top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 48px;
}


</style>
