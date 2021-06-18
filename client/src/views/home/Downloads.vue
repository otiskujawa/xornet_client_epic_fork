<template>
  <div class="view downloads">
    <Header />
    <div class="downloadContent" v-if="releases">
      <div class="reporterTitle flex-col md:flex-row">
        <Logo class="max-w-full" />
        <div class="flex bottom items-start md:items-end">
          <h1 class="reporterLogo">Reporter</h1>
          <h1 class="version">{{releases.tag_name}}</h1>
        </div>
      </div>

      <h1>The Xornet Reporter easily lets you connect your computer to the platform</h1>

      <p>The reporter uses the NodeJS runtime enviroment and is compiled to run natively on most common operating systems</p>

      <img class="previewImage" src="https://cdn.discordapp.com/attachments/755597803102928966/855248964206985257/unknown.png" alt="">

      <div class="lists gap-4 md:gap-32">
        <ul>
          <p>With it you can remotely:</p>
          <li>View CPU usage</li>
          <li>View RAM usage</li>
          <li>View TRX usage</li>
          <li>View DISK usage</li>
          <li>View network usages</li>
          <li>Restart or Shutdown your machine</li>
          <li>SSH into your machine through the WebUI</li>
          <li>View & Kill processes</li>
          <li>Gain points to flex on your friends</li>
        </ul>
        <ul>
          <p>Supported operating systems:</p>
          <li>Debian</li>
          <li>Ubuntu</li>
          <li>Manjaro</li>
          <li>Arch</li>
          <li>HiveOS</li>
          <li>Windows 7/8/10/11</li>
          <li>Windows Server 2019</li>
          <li>MacOS</li>
        </ul>
      </div>

      <h1>Binaries</h1>
      <div class="downloadArea grid grid-cols-2 gap-4 md:grid-cols-3">
        <div class="platform">
          <img :src="require('@/assets/logos/windows.svg')" alt="Windows Binaries" class="w-64 md:w-32">
          <h1>Windows</h1>
          <a :href="downloadLinks.win" target="_blank">
            <ShadowButton title="Download EXE" icon="downloads"/>
          </a>
        </div>
        <div class="platform">
          <img :src="require('@/assets/logos/linux.svg')" alt="Linux Binaries" class="w-64 md:w-32">
          <h1>Linux</h1>
          <a :href="downloadLinks.linux" target="_blank">
            <ShadowButton title="Download Binary" icon="downloads"/>
          </a>
        </div>
        <div class="platform">
          <img :src="require('@/assets/logos/apple.svg')" alt="MacOS Binaries" class="w-64 md:w-32">
          <h1>MacOS</h1>
          <a :href="downloadLinks.macos" target="_blank">
            <ShadowButton title="Download DMG" icon="downloads"/>
          </a>
        </div>
      </div>
      <div class="installationSteps flex-col md:flex-row">
        <div class="step flex flex-col gap-4">
          <h1>Linux Service Installation Steps</h1>
          <div class="cockBlock p-4 max-w-full rounded-md">
            <h2><strong># Linux install steps</strong></h2>
            <h2><strong># Download & Install script</strong></h2>
            <h2><strong>$</strong> sudo wget xornet.cloud/reporter/install.sh</h2>
            <h2><strong>$</strong> sudo chmod +x ./install.sh</h2>
            <h2><strong>$</strong> sudo ./install.sh</h2>
          </div>
        </div>
        <div class="step flex flex-col gap-4">
          <h1>MacOS Binary Execution Steps</h1>
          <div class="cockBlock p-4 max-w-full rounded-md">
            <h2><strong># MacOS execution steps</strong></h2>
            <h2><strong># Download & Run</strong></h2>
            <h2><strong>$</strong> wget xornet.cloud/reporter/xornet-reporter-macos</h2>
            <h2><strong>$</strong> chmod +x ./xornet-reporter-macos</h2>
            <h2><strong>$</strong> ./xornet-reporter-macos</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/home/Header";
import Logo from "@/components/dashboard/Logo";
import axios from "axios";
import ShadowButton from "@/components/dashboard/ShadowButton";

export default {
  name: "Downloads",
  components: {
    Logo,
    Header,
    ShadowButton,
  },
  computed:{
    downloadLinks: function(){
      return {
        win: this.releases.assets.filter(asset => asset.name.includes('win'))[0].browser_download_url,
        macos: this.releases.assets.filter(asset => asset.name.includes('macos'))[0].browser_download_url,
        linux: this.releases.assets.filter(asset => asset.name.includes('linux'))[0].browser_download_url,
      }
    },
  },
  data(){
    return {
      releases: null
    }
  },
  async mounted() {
    this.releases = (await axios.get('https://api.github.com/repos/Geoxor/Xornet/releases/latest')).data;
  },
};
</script>

<style>
.downloads {
  background-color: var(--dark);
  height: 100%;
  width: 100%;
  position: relative;
}

.downloads * {
  color: white;
  font-weight: normal;
  font-family: "Tomorrow", sans-serif;
  font-size: 24px;
  line-height: 175%;
  text-align: left;
}

.downloadContent {
  padding: 96px 10% 10%;
  gap: 32px;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.downloadContent *:not(.previewImage) {
  z-index: 20;
}

.downloadContent p {
  font-size: 18px;
  max-width: 920px;
  color: white;
}

.previewImage {
  position: absolute;
  height: 465px;
  width: auto;
  right: 10vw;
  z-index: 0;
}

@media only screen and (max-width: 800px) {
  .previewImage {
    display: none;
  }
}

.reporterTitle {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
}

.reporterTitle * {
  line-height: 82%;
}

.reporterLogo {
  font-size: 48px;
  text-transform: uppercase;
  font-weight: 400;
}

.version {
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.lists {
  display: flex;
}

.lists li {
  font-size: 14px;
  line-height: 25px;
  list-style: inside;
  text-align: left;
}

.installationSteps {
  display: flex;
  gap: 16px;
}

.installationSteps .step {
  width: 100%;
}

.cockBlock {
  background-color: #111122;
}

.cockBlock * {
  font-family: Roboto Mono;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}
.cockBlock * strong {
  color: #222244;
}

.downloadArea {
  width: 100%;
}

.downloadArea > .platform {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.downloadArea > .platform > h1 {
  text-align: center;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 68%;
}

</style>
