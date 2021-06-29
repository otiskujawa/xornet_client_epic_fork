<template>
  <div class="main bg-gray-200 color-white">
    <img :src="require('@/assets/logos/logoColored.svg')" alt="Xornet" />

    <div class="textFields">
      <section>
        <h1>Our Goal</h1>
        <p>
          We are XORNET this is a fun little project started by Geoxor for people who have servers and wanna be able to manage
          them remotely<br />
          Our goal is to make a platform for people to manage their servers!<br />
          <br />
        </p>
      </section>
      <section>
        <h1>Infrastructure</h1>
        <p>
          We have one main server that your computer will connect to, to report its data every second<br />
          Users can add their servers in a group called a "Datacenter" where they can monitor a set of computers<br />
          <br />
          The main idea is that you can easily see what all your servers are doing in one place
        </p>
      </section>
    </div>

    <div v-if="totalMachines" class="coolShit">
      <div class="textField ">
        <h1>{{ totalMachines }}</h1>
        <p>Total Machines</p>
      </div>
      <div class="textField ">
        <h1>{{ totalTraffic }}GB</h1>
        <p>Total Daily Traffic</p>
      </div>
      <div class="textField ">
        <h1>{{ totalCores }}</h1>
        <p>Total Shared Cores</p>
      </div>
      <div class="textField ">
        <h1>{{ totalRam }}GB</h1>
        <p>Total RAM</p>
      </div>
      <div class="backgroundRectangle"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "main",
  data: () => {
    return {
      totalMachines: null,
      totalTraffic: null,
      totalCores: null,
      totalRam: null
    };
  },
  async mounted() {
    const response = await axios.get("https:///backend.xornet.cloud/stats");
    if (response.status == 200) {
      this.totalMachines = response.data.totalMachines;
      this.totalTraffic = response.data.totalTraffic;
      this.totalCores = response.data.totalCores;
      this.totalRam = response.data.totalRam;
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  padding: 8px 10vw;
  position: relative;
  height: 100vh;
  overflow: hidden scroll;
}

.main img {
  z-index: 2;
  margin-top: 156px;
  max-width: 90%;
}

.textFields {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

section h1 {
  font-size: 48px;
  width: fit-content;
  line-height: 54px;
  z-index: 2;
  font-style: normal;
  font-weight: bold;
}

section p {
  font-size: 14px;
  line-height: 20px;
  z-index: 2;
  text-align: left;
  vertical-align: top;
  max-width: 900px;
  letter-spacing: -4%;
}

.coolShit {
  gap: 16px;
  display: flex;
  margin-top: 64px;
  justify-content: space-between;
  position: relative;
  color: white;
}

.coolShit h1 {
  z-index: 2;
}

.textField {
  transform: translateY(160px);
  z-index: 2;
  position: relative;
}

.textField h1 {
  color: var(--white);
  font-size: 48px;
  text-align: left;
}

.textField p {
  color: rgba(141, 153, 174, 1);
  text-align: left;
}

.backgroundRectangle {
  width: calc(120vw + 200px);
  height: 328px;
  position: absolute;
  top: 0px;

  /* Dark */
  z-index: 1;
  background: #151527;
  transform: rotate(-4.71deg) translateX(-25vw);
}
</style>
