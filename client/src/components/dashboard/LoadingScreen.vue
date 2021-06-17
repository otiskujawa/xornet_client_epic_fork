<template>
  <div v-if="isVisible" class="loadingScreen">
    <Logo class="logo" />
    <progress :value="loadingProgress" max="100"></progress>
  </div>
</template>

<script>
import Logo from "@/components/dashboard/Logo";
export default {
  name: "LoadingScreen",
  components: {
    Logo
  },
  data: () => {
    return {
      loadingProgress: 0,
      isVisible: true
    };
  },
  async mounted() {
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i <= 100; i++) {
      this.loadingProgress = i;
      await sleep(50);
      if (this.loadingProgress == 100) {
        await sleep(50);
        this.isVisible = false;
      }
      if (this.isLoaded) {
        this.loadingProgress = 100;
        await sleep(150);
        this.isVisible = false;
        break;
      }
    }
  },
  props: {
    isLoaded: { type: Boolean, required: true }
  }
};
</script>

<style scoped>
.loadingScreen {
  background: var(--background-color);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}

.loadingScreen .logo {
  width: 256px;
  height: auto;
}

.loadingScreen progress {
  -webkit-appearance: none;
  appearance: none;

  width: 250px;
  height: 4px;
  border-radius: 4px;
  overflow: hidden;
}

.loadingScreen progress::-webkit-progress-bar {
  background-color: var(--white);
}

.loadingScreen progress::-webkit-progress-value {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  transition: 100ms ease;
  border-radius: 4px;
}
</style>
