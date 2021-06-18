<template>
  <div class="view downloads">
    <Header />
    <div class="downloadContent" v-if="releases">
      <div class="reporterTitle">
        <Logo />
        <h1 class="reporterLogo">Reporter</h1>
        <h1 class="version">{{releases.tag_name}}</h1>
      </div>

      <h1>The Xornet Reporter easily lets you connect your computer to the platform</h1>

      <p>The reporter uses the NodeJS runtime enviroment and is compiled to run natively on most common operating systems</p>

      <div class="lists">
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
      <div class="downloadArea">
        <div class="platform">
          <img :src="require('@/assets/logos/windows.svg')" alt="Windows Binaries">
          <h1>Windows</h1>
          <a :href="downloadLinks.win" target="_blank">
            <ShadowButton title="Download EXE" icon="downloads"/>
          </a>
        </div>
        <div class="platform">
          <img :src="require('@/assets/logos/linux.svg')" alt="Linux Binaries">
          <h1>Linux</h1>
          <a :href="downloadLinks.linux" target="_blank">
            <ShadowButton title="Download Binary" icon="downloads"/>
          </a>
        </div>
        <div class="platform">
          <img :src="require('@/assets/logos/apple.svg')" alt="MacOS Binaries">
          <h1>MacOS</h1>
          <a :href="downloadLinks.macos" target="_blank">
            <ShadowButton title="Download DMG" icon="downloads"/>
          </a>
        </div>
      </div>

      <div class="installationSteps">
        <div class="step">
          <h1>Linux Service Installation Steps</h1>
          <div class="cockBlock">
            <h2><strong># Linux install steps</strong></h2>
            <h2><strong># Download & Install script</strong></h2>
            <h2><strong>$</strong> sudo wget xornet.cloud/reporter/install.sh</h2>
            <h2><strong>$</strong> sudo chmod +x ./install.sh</h2>
            <h2><strong>$</strong> sudo ./install.sh</h2>
          </div>
        </div>
        <div class="step">
          <h1>MacOS Binary Execution Steps</h1>
          <div class="cockBlock">
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
  padding: 96px 15vw 0px;
  gap: 32px;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.downloadContent p {
  font-size: 18px;
  max-width: 920px;
  color: white;
}

.reporterTitle {
  display: flex;
  justify-content: flex-start;
}

.reporterTitle * {
  line-height: 100%;
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
  gap: 128px;
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
  padding: 16px;
  background-color: #111122;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 128px;
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
  display: flex;
  gap: 32px;
  padding: 0px 128px;
  justify-content: space-between;
  width: 100%;
}

.downloadArea > .platform {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.downloadArea > .platform > img {
  width: 128px;
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
