<template>
  <div class="profilepage">
    <div class="heading">
      <img class="profileBanner" :src="profile?.profileBanner ?? 'https://i.pinimg.com/originals/65/c7/d4/65c7d4a8f34de11f9414ce49b847e56a.gif'" :alt="profile.username" />
      <div class="profileImage" :class="{border: profile?.profileImage?.hasAlpha}" :style="{ 'background-image': `url(${profile?.profileImage?.url ?? 'https://wallpapercave.com/wp/wp8846945.jpg'})` }">
        <div class="xornetBadge"><img :src="require('@/assets/logos/logo.svg')" alt="Xornet Developer" /></div>
      </div>
    </div>

    <div class="details">
      <div class="heading">
        <!-- make this change to the user's selected badge -->
        <img :src="require(`@/assets/badges/developer.svg`)" />

        <div class="container">
          <h1 class="username">{{ profile.username }}</h1>
          <img class="location" :src="profile.geolocation?.countryCode ? require(`@/assets/flags/${profile.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
        </div>
      </div>

      <section class="uuid">
        <h1>{{ profile._id }}</h1>
        <img :src="require(`@/assets/icons/clipboard.png`)" />
      </section>

      <section>
        <h1 class="descriptionHeading">Points</h1>
        <p class="points">{{ profile.points || "0" }}</p>
        <div class="line"></div>
      </section>

      <section v-if="profile.badges">
        <h1 class="descriptionHeading">Badges</h1>

        <img v-if="profile.badges.includes('developer')" :src="require(`@/assets/badges/developer.svg`)" />
        <img v-if="profile.badges.includes('designer')" :src="require(`@/assets/badges/designer.svg`)" />
        <img v-if="profile.badges.includes('contributor')" :src="require(`@/assets/badges/contributor.svg`)" />

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

      <section v-if="profile.created">
        <h1 class="descriptionHeading">Created</h1>
        <p class="descriptionText">{{ profile.created }}</p>
      </section>

      <div class="line"></div>
    </div>

    <form v-if="isEditing" v-on:submit.prevent="save()">
      <img class="profileImage" :src="profile?.profileImage?.url ?? 'https://wallpapercave.com/wp/wp8846945.jpg'" alt="" @click="$refs.profileImage.click()" />
      <input type="file" id="profileImage" ref="profileImage" style="display: none;" name="profileImage" accept="image/*" />

      <input v-model="profile.username" class="i" type="text" placeholder="Username" />
      <input v-model="profile.email" class="i" type="email" placeholder="Email" />
      <input v-model="profile.password" class="i" type="password" placeholder="New password" />
      <input v-model="profile.repeatPassword" class="i" type="password" placeholder="Repeat Password" />
      <button type="submit">SAVE</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => {
    return {
      profile: {},
      isEditing: true,
    };
  },
  async created() {
    this.profile = await this.api.user.fetchProfile(this.$route.params.username);
  },
  methods: {
    async save() {
      let response = await this.api.user.save(Object.assign({}, this.profile), this.$refs.profileImage.files[0]);
      // this.profile.profileImage = response.profile.profileImage;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    },
  },
  watch: {
    async $route(to, from) {
      this.profile = await this.api.user.fetchProfile(this.$route.params.username);
    }
  },
};
</script>

<style scoped>
.profilepage {
  min-width: 100%;
  min-height: 100%;
  position: relative;
  height: 100%;
}

.profilepage form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.profilepage .heading {
  display: flex;
  position: relative;
}

.profilepage .heading .profileBanner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  position: absolute;
}

.profilepage .heading .profileImage {
  transform: translate(-6px);
  width: 180px;
  box-sizing: content-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 180px;
  margin: 200px 0px 0px 200px;
  border: 6px solid var(--background-color);
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  position: relative;
  object-fit: cover;
}

.profilepage .heading .profileImage.border {
  border: 6px solid transparent;
}

.profilepage .heading .xornetBadge {
  background: linear-gradient(90deg, #db00ff 0%, #8000ff 31.77%, #00b2ff 64.06%, #00fff0 98.44%);
  transform: translate(-6px);
  border: 6px solid var(--background-color);
  width: fit-content;
  padding: 4px 8px;
  border-radius: 100px;
  height: fit-content;
  position: absolute;
  bottom: 0px;
}
.profilepage .heading .xornetBadge img {
  height: 8px;
  width: auto;
}

.profilepage .details {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 20px;
  width: 256px;
  margin-left: 200px;
  margin-top: 24px;
}

.profilepage .details .heading {
  display: flex;
  gap: 8px;
  align-items: center;
}

.profilepage .details .heading .container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.profilepage .details .heading .username {
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 68%;
  /* or 42px */

  color: #000000;
}

.profilepage .details .heading .location {
  height: 20px;
}

.profilepage .details .uuid {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: translate(-6px);
  gap: 8px;
  border-radius: 200px;
  transition: all 50ms;
  background-color: var(--background-color);
}

.profilepage .details .uuid:hover {
  filter: invert(1);
}

.profilepage .details .uuid h1 {
  font-family: "Roboto Mono", monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
}

.profilepage .details .uuid img {
  width: 20px;
}

section h1 {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #c8c8c8;
}

.points {
  background: linear-gradient(90deg, #db00ff 0%, #8000ff 31.77%, #00b2ff 64.06%, #00fff0 98.44%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Work Sans;
  font-weight: 600;
  font-size: 36px;
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

  color: #000000;
}

.line {
  width: 100%;
  height: 1px;
  margin-top: 20px;
  background-color: #e7e7e7;
}
</style>
