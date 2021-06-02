<template>
  <div class="profilepage" v-if="profile.username">
    <div class="heading">
      <img class="profileBanner" @click="$refs.profileBanner.click()" :src="profile.profileBanner?.url || 'https://cdn.discordapp.com/attachments/806300597338767450/849668963033153606/Normal.gif'" :alt="profile.username" />
      <div class="profileImage" @click="$refs.profileImage.click()" :class="{ border: profile.profileImage?.hasAlpha }" :style="{ 'background-image': `url(${profile.profileImage?.url ?? 'https://wallpapercave.com/wp/wp8846945.jpg'})` }">
        <div class="xornetBadge" v-if="profile.isDev"><img :src="require('@/assets/logos/logo.svg')" alt="Xornet Developer" /></div>
      </div>

      <form v-if="isEditing">
        <input type="file" id="profileImage" ref="profileImage" style="display: none;" name="profileImage" accept="image/*" />
        <input type="file" id="profileBanner" ref="profileBanner" style="display: none;" name="profileBanner" accept="image/*" />
      </form>

      <section v-if="!isEditing && profile.username == username" @click="isEditing = !isEditing" class="shadowButton edit">
        <h1>Edit</h1>
        <img :src="require(`@/assets/icons/edit.png`)" />
      </section>

      <section v-if="isEditing && profile.username == username" @click="save(); isEditing = !isEditing" class="shadowButton edit">
        <h1>Save</h1>
        <img :src="require(`@/assets/icons/save.png`)" />
      </section>
    </div>

    <div class="details" :class="{editing: isEditing}">
      <div class="heading">
        <!-- make this change to the user's selected badge -->
        <img v-if="profile.badges?.owned[profile.badges.selected]" :src="require(`@/assets/badges/${profile.badges?.owned[profile.badges.selected]}.svg`)" />

        <div class="container">
          <h1 class="username">{{ profile.username }}</h1>
          <img class="location" :src="profile.geolocation?.countryCode ? require(`@/assets/flags/${profile.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
        </div>
      </div>

      <section class="shadowButton uuid" :class="{didCopy: didCopy}" @click="copyUUID">
        <h1 id="profileID" >{{ copyMessage || profile._id }}</h1>
        <img :src="require(`@/assets/icons/clipboard.png`)" />
      </section>

      <section>
        <h1 class="descriptionHeading">Points</h1>
        <p class="points">{{ profile.points || "0" }}</p>
      </section>

      <div class="line"></div>

      <section v-if="profile.badges?.owned && profile.badges?.owned.length != 0">
        <h1 class="descriptionHeading">Badges</h1>

        <div class="badges">
          <img class="badge" v-if="profile.badges?.owned?.includes('developer')" :src="require(`@/assets/badges/developer.svg`)" />
          <img class="badge" v-if="profile.badges?.owned?.includes('designer')" :src="require(`@/assets/badges/designer.svg`)" />
          <img class="badge" v-if="profile.badges?.owned?.includes('contributor')" :src="require(`@/assets/badges/contributor.svg`)" />
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
        <p class="descriptionText">{{ new Date(profile.created_at).toLocaleString() }}</p>
      </section>

      <div class="line"></div>

      <section class="socials" v-if="profile.socials?.length != 0">
        <a :href="platform.url" target="_blank" class="shadowButton uuid" v-for="platform of profile.socials" :key="platform">
          <h1 class="nameOnPlatform">@{{platform.url.split('/')[platform.url.split('/').length - 1]}}</h1>
          <img :src="require(`@/assets/icons/${platform.name}.png`)" />
        </a>
        <div class="line"></div>
      </section>

      <section>
        <h1 class="descriptionHeading">Bio</h1>
        <p class="descriptionText">{{ profile.bio || "Im new to xornet uwu!"}}</p>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => {
    return {
      profile: {},
      didCopy: false,
      copyMessage: null,
      isEditing: false
    };
  },
  computed: {
    username: function(){
      return localStorage.getItem('username');
    }
  },
  async created() {
    this.profile = await this.api.user.fetchProfile(this.$route.params.username);
  },
  methods: {
    async save() {
      let response = await this.api.user.save(Object.assign({}, this.profile), this.$refs.profileImage.files[0], this.$refs.profileBanner.files[0]);
      // this.profile.profileImage = response.profile.profileImage;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
    },
    copyUUID() {
      let toCopy = document.querySelector('#profileID');
      var temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value= toCopy.innerText
      temp.select();
      try{
        var successful = document.execCommand("copy");
        document.body.removeChild(temp); 
        var msg = successful ? 'successful' : 'unsuccessful';

        this.didCopy = true;
        this.copyMessage = "UUID Copied!";
        setTimeout(() => {
          this.didCopy = false;
          this.copyMessage = null;
        }, 3000);
      } catch {
        console.log('Oops, unable to copy');
      };
    },
  },
  watch: {
    async $route(to, from) {
      this.profile = await this.api.user.fetchProfile(this.$route.params.username);
    }
  }
};
</script>

<style scoped>
.profilepage {
  min-width: 100%;
  min-height: 100%;
  position: relative;
  height: 100%;
  overflow: scroll;
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

.shadowButton {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  height: fit-content;
  cursor: pointer;
  text-decoration: none;
  gap: 8px;
  flex-direction: row;
  border-radius: 200px;
  transition: all 100ms;
  background-color: var(--background-color);
}

.shadowButton:not(.didCopy):hover {
  filter: invert(1);
}

.shadowButton h1 {
  font-family: "Roboto Mono", monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}

.shadowButton img {
  width: 20px;
}

.shadowButton.didCopy {
  background-color: rgb(51, 255, 0) !important;
}

.shadowButton.edit {
  transform: translate(210px, 118px);
  width: min-content;
}

.shadowButton.edit h1 {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.profilepage .details .badges {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.profilepage .details .badges  .badge {
  width: 28px;
  height: 28px;
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
}

section h1 {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #c8c8c8;
}

section.socials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
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
  margin-top: 8px;
  background-color: #e7e7e7;
}
</style>
