<template>
  <div class="profilePage" v-if="profile.username">
    <div class="heading">
      <div class="header">
        <img
          class="banner"
          :src="
            profile.profileBanner?.url ||
              'https://cdn.discordapp.com/attachments/806300597338767450/855757714806407188/unknown.png'
          "
          :alt="profile.username"
        />
        <Icon class="edit" @click="$refs.banner.click()" v-if="isEditing" icon="edit" />
      </div>
      <div
        class="pfp"
        :class="{ border: profile.profileImage?.hasAlpha }"
        :style="{
          'background-image': `url(
            ${newPFP ||
              profile.profileImage?.url ||
              'https://cdn.discordapp.com/attachments/816028632269979668/855437868825444372/unknown.png'})`
        }"
      >
        <div class="xornetBadge" v-if="profile.isDev">
          <img :src="require('@/assets/logos/logo.svg')" alt="Xornet Developer" />
        </div>
        <Icon class="edit" @click="$refs.pfp.click()" v-if="isEditing" icon="edit" />
      </div>

      <form v-if="isEditing">
        <input type="file" id="pfp" ref="pfp" style="display: none" name="pfp" accept="image/*" />
        <input type="file" id="banner" ref="banner" style="display: none" name="banner" accept="image/*" />
      </form>

      <ShadowButton
        title="Edit"
        icon="edit"
        v-if="!isEditing && profile.username == username"
        @click="isEditing = !isEditing"
        class="edit "
      />
      <ShadowButton
        title="Save"
        icon="save"
        v-else-if="profile.username == username"
        @click="
          save();
          isEditing = !isEditing;
        "
        class="edit"
      />
    </div>
    <SocialCard :add="add" v-if="isAddingSocial && isEditing" />

    <div class="content">
      <div class="profileDetails" :class="{ editing: isEditing }">
        <div class="heading">
          <!-- make this change to the user's selected badge -->
          <Tooltip v-if="profile.badges?.owned[profile.badges.selected]" :text="profile.badges?.owned[profile.badges.selected]">
            <img :src="require(`@/assets/badges/${profile.badges?.owned[profile.badges.selected]}.svg`)" />
          </Tooltip>
          <div class="container">
            <h1 class="username">{{ profile.username }}</h1>
            <img
              class="location"
              :src="
                profile.geolocation?.countryCode
                  ? require(`@/assets/flags/${profile.geolocation.countryCode}.png`)
                  : require('@/assets/flags/__.png')
              "
              alt="Country Flag"
            />
          </div>
        </div>

        <ShadowButton class="uuid" icon="clipboard" :title="profile._id" allowCopy />

        <section>
          <h1 class="descriptionHeading">Points</h1>
          <p class="points" @mouseenter="showFullPoints = true" @mouseleave="showFullPoints = false">
            {{ showFullPoints ? ~~points.tweened : millify(points.number) || "0" }}
          </p>
        </section>

        <div class="line"></div>

        <section v-if="profile.badges?.owned && profile.badges?.owned.length != 0">
          <h1 class="descriptionHeading">Badges</h1>

          <div class="badges">
            <Tooltip v-for="(badge, index) of profile.badges.owned" :key="badge" :text="badge">
              <!--  [ is this true ? if so do this : otherwise do this ] -->
              <img
                class="badge"
                :class="{
                  isEditing,
                  selectedBadge: index == profile.badges.selected
                }"
                @click="isEditing ? changeBadge(index) : null"
                :src="require(`@/assets/badges/${badge}.svg`)"
              />
            </Tooltip>
          </div>

          <div class="line"></div>
        </section>

        <section v-if="profile.name">
          <h1 class="descriptionHeading">Name</h1>
          <p class="descriptionText">{{ profile.name }}</p>
        </section>

        <section v-if="profile.email">
          <h1 class="descriptionHeading">Email</h1>
          <p class="descriptionText">{{ profile.email }}</p>
        </section>

        <section v-if="profile.created_at">
          <h1 class="descriptionHeading">Created</h1>
          <p class="descriptionText">
            {{ new Date(profile.created_at).toLocaleString() }}
          </p>
        </section>

        <div class="line"></div>

        <section class="socials" v-if="profile.socials?.length != 0 || isEditing">
          <div
            v-for="(platform, index) of profile.socials"
            :key="platform"
            @click="isEditing ? remove(index) : open(platform.url)"
            class="shadowButton"
            :class="{ isEditing: isEditing }"
          >
            <h1 v-if="platforms.includes(platform.name)" class="nameOnPlatform">
              @{{ platform.url.split("/")[platform.url.split("/").length - 1] }}
            </h1>
            <h1 v-if="!platforms.includes(platform.name)" class="nameOnPlatform">
              {{ platform.name }}
            </h1>
            <img
              :src="
                platform.name != null && platforms.includes(platform.name)
                  ? require(`@/assets/icons/filled/${platform.name}.svg`)
                  : require(`@/assets/icons/filled/globe.svg`)
              "
            />
            <img v-if="isEditing" :src="require(`@/assets/icons/filled/x.svg`)" />
          </div>

          <ShadowButton
            title="Add"
            icon="add"
            @click="isAddingSocial = !isAddingSocial"
            v-if="isEditing"
            :class="{ isEditing: isEditing }"
          />
        </section>

        <div class="line" v-if="profile.socials?.length != 0 || isEditing"></div>

        <section class="descriptionSection">
          <Icon class="edit" v-if="isEditing" icon="edit" />
          <h1 class="descriptionHeading" v-if="profile.bio && !isEditing">
            Bio
          </h1>
          <textarea
            v-if="!isEditing"
            maxlength="256"
            class="descriptionText textArea"
            cols="30"
            rows="10"
            v-model="profile.bio"
            disabled
          ></textarea>
          <textarea
            v-if="isEditing"
            maxlength="256"
            class="descriptionText textArea editing"
            cols="30"
            rows="10"
            v-model="profile.bio"
          ></textarea>
        </section>
      </div>

      <div class="stats">
        <a :href="profile.speedtest.result.url" target="_blank" class="speedtest" v-if="profile.speedtest">
          <h1>
            Internet Speedtest
            <strong>{{ new Date(Date.now() - new Date(profile.speedtest.timestamp).valueOf()).getMinutes() }}m ago</strong>
          </h1>
          <div class="gauges">
            <Gauge
              :icon="require('@/assets/icons/filled/download.svg')"
              suffix="mbps"
              :value="parseFloat((profile.speedtest.download.bandwidth / 100000).toFixed(2))"
              color="#000"
            />
            <Gauge
              :icon="require('@/assets/icons/filled/upload.svg')"
              suffix="mbps"
              :value="parseFloat((profile.speedtest.upload.bandwidth / 100000).toFixed(2))"
              color="#000"
            />
          </div>
        </a>

        <InfoField nogauge icon="stack" title="Total servers" :value="profile.machines.length" />
        <InfoField nogauge icon="ram" title="Total ram" :value="`${Math.ceil(profile.totalRam / 1000 / 1000 / 1000)}GB`" />
        <InfoField nogauge icon="cpu" title="Total shared cores" :value="profile.totalCores" />
      </div>
    </div>
  </div>
</template>

<script>
import SocialCard from "@/components/misc/SocialCard";
import gsap from "gsap";
import socket from "@/services/socket.js";
import Gauge from "@/components/dashboard/Gauge";
import InfoField from "@/components/dashboard/InfoField";
import Icon from "@/components/misc/Icon";
import ShadowButton from "@/components/dashboard/ShadowButton";
import { millify } from "millify";
import Tooltip from "@/components/dashboard/Tooltip";

export default {
  name: "Profile",
  components: {
    SocialCard,
    InfoField,
    Icon,
    Gauge,
    ShadowButton,
    Tooltip
  },
  data: () => {
    return {
      platforms: [
        "youtube",
        "twitch",
        "twitter",
        "discord",
        "reddit",
        "facebook",
        "github",
        "steam",
        "instagram",
        "tiktok",
        "tumblr",
        "vk"
      ],
      profile: {},
      points: {
        number: 0,
        tweened: 0
      },
      newPFP: undefined,
      showFullPoints: false,
      isEditing: false,
      isAddingSocial: false
    };
  },
  computed: {
    username: function() {
      return localStorage.getItem("username");
    }
  },
  async created() {
    this.profile = await this.api.user.fetchProfile(this.$route.params.username);
    this.points.number = this.profile.points;
    this.points.tweened = this.profile.points;
  },
  mounted() {
    socket.off("points");
    socket.emit("getPoints", this.$route.params.username);
    socket.on("points", points => {
      console.log(
        `%c[WS]` + `%c [Points]`,
        "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;",
        "color: #ff77aa;",
        points
      );
      this.points.number = points;
      gsap.to(this.points, { duration: 0.5, tweened: points });
    });
  },
  methods: {
    millify,
    remove(index) {
      this.profile.socials.splice(index, 1);
    },
    add(url) {
      let name = extractHostname(url);

      function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
          hostname = url.split("/")[2];
        } else {
          hostname = url.split("/")[0];
        }

        //find & remove port number
        hostname = hostname.split(":")[0];
        //find & remove "?"
        hostname = hostname.split("?")[0];

        return hostname;
      }

      if (url.endsWith("/")) url = url.substring(0, url.length - 1);

      let sites = [
        "youtube",
        "twitch",
        "discord",
        "reddit",
        "github",
        "facebook",
        "steam",
        "instagram",
        "tiktok",
        "tumblr",
        "vk"
      ];

      sites.forEach(element => {
        if (url.includes(element)) name = element;
      });

      url = {
        name,
        url
      };

      this.profile.socials.push(url);
    },
    open(url) {
      window.open(url, "_blank");
    },
    async save() {
      let response = await this.api.user.save(
        Object.assign({}, this.profile),
        this.$refs.pfp.files[0],
        this.$refs.banner.files[0]
      );

      // this.profile.pfp = response.profile.pfp;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    },
    /**
     * @author cimok
     * Changes the currently selected badge.
     */
    changeBadge(index) {
      this.profile.badges.selected = index;
    }
  },
  watch: {
    async $route(to, from) {
      if (to.name == from.name) {
        socket.emit("getPoints", this.$route.params.username);
        this.profile = await this.api.user.fetchProfile(this.$route.params.username);
      }
    }
  }
};
</script>

<style>
.profilePage {
  min-width: 100%;
  min-height: 100%;
  height: 100vh;
  position: relative;
  overflow: scroll;
}
.heading {
  display: flex;
  position: relative;
  align-items: flex-end;
}
.heading img {
  user-select: none;
}
.banner {
  width: 100%;
  height: 300px;
  top: 0;
  object-fit: cover;
  position: absolute;
}
.header .edit {
  cursor: pointer;
  transition: 100ms ease;
  width: 128px;
  position: absolute;
  top: 40%;
  filter: invert(1);
  left: 50%;
  transform: translate(-50%, -50%);
}
.header .edit:hover {
  width: 144px;
}
.header .edit:active {
  width: 112px;
}
.pfp {
  transform: translate(-6px);
  width: 180px;
  box-sizing: content-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 180px;
  margin: 200px 0px 0px 10vw;
  border: 6px solid var(--background-color);
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  position: relative;
  object-fit: cover;
}
.pfp.border {
  border: 6px solid transparent;
}
.pfp .edit {
  cursor: pointer;
  transition: 100ms ease;
  width: 64px;
  position: absolute;
  top: 50%;
  filter: invert(1);
  left: 50%;
  transform: translate(-50%, -50%);
}
.pfp .edit:hover {
  width: 72px;
}
.pfp .edit:active {
  width: 56px;
}
.xornetBadge {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  transform: translate(-6px);
  border: 6px solid var(--background-color);
  width: fit-content;
  padding: 8px 8px;
  border-radius: 100px;
  height: fit-content;
  position: absolute;
  bottom: 0px;
}
.xornetBadge img {
  height: 8px;
  width: auto;
}
.profilePage .content {
  display: flex;
  margin-top: 24px;
  gap: 64px;
}
.stats {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 224px);
  grid-template-rows: repeat(4, 72px);
}
.speedtest {
  width: 100%;
  padding: 16px 16px 20px 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: flex;

  cursor: pointer;
  transition: 100ms ease;
  gap: 16px;
  height: fit-content;
  flex-direction: column;
}
.speedtest:hover {
  transform: translateY(-1px);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}
.speedtest > h1 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
  color: var(--black);
}
.speedtest > h1 strong {
  font-family: "Roboto Mono";
  color: #c8c8c8;
  text-transform: lowercase;
}
.speedtest .gauges {
  display: flex;
  gap: 16px;
}
.profileDetails {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 20px;
  width: 256px;
  margin-left: 10vw;
  margin-bottom: 128px;
}
section:not(.uuid) {
  display: flex;
  flex-direction: column;
  color: #c8c8c8;
  gap: 8px;
  justify-content: space-between;
}
section h1:not(#profileID) {
  display: flex;
  align-items: center;
}
section.socials {
  display: grid;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  gap: 8px;
}
.profileDetails .heading {
  display: flex;
  gap: 8px;
  align-items: center;
}
.profileDetails .heading .container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}
.profileDetails .heading .username {
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 600;
  max-width: 100%;
  font-size: 28px;
  line-height: 68%;
  color: var(--black);
  overflow: hidden;
  text-overflow: ellipsis;
}
.profileDetails .heading .location {
  height: 20px;
  user-select: none;
}
.badges {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.badge {
  width: 36px;
  height: 36px;
  padding: 4px;
  user-select: none;
  transition: 100ms ease;
}
.badge.isEditing:hover {
  transform: scale(1.35) rotate(20deg);
  cursor: pointer;
}
.badge.isEditing:active {
  transform: scale(0.9) rotate(-360deg);
}
.badge.isEditing.selectedBadge {
  background-color: var(--green);
  border-radius: 500px;
}
.points {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Work Sans;
  font-weight: 600;
  font-size: 36px;
}

.descriptionHeading {
  color: #c7c7c7;
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
}

.descriptionText {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 117.9%;
  /* identical to box height, or 17px */

  display: flex;
  align-items: center;

  background-color: var(--background-color);

  outline: none;

  color: var(--black);
}
.descriptionSection {
  position: relative;
}
.descriptionSection .edit {
  cursor: pointer;
  transition: 100ms ease;
  width: 24px;
  position: absolute;
  filter: invert(1);
  bottom: 20px;
  right: 20px;
  transform: translate(50%, 50%);
  z-index: 999;
}
.descriptionSection .edit:hover {
  width: 32px;
}
.descriptionSection .edit:active {
  width: 16px;
}
.textArea {
  border: none;
  resize: none;
  background: none;
}
.textArea.editing {
  padding: 8px;
  border-radius: 8px;
  border: 2px var(--border-color) dashed;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}
.line {
  width: 100%;
  height: 1px;
  margin-top: 8px;
  background-color: var(--border-color);
}

.shadowButton.edit {
  width: min-content;
  margin-bottom: 24px;
  margin-left: 16px;
}
.shadowButton.edit h1 {
  font-family: Work Sans;
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  align-items: center;
}
</style>
