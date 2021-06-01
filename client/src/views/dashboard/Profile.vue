<template>
  <div class="profilepage">
    <h1>Profile</h1>
    <form v-on:submit.prevent="save()">
      <img class="profileImage" :src="profile?.profileImage ?? 'https://wallpapercave.com/wp/wp8846945.jpg'" alt="" @click="$refs.profileImage.click()" />
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
      profile: {}
    };
  },
  async created() {
    this.profile = await this.api.user.fetchMe();
  },
  methods: {
    async save() {
      let response = await this.api.user.save(Object.assign({}, this.profile), this.$refs.profileImage.files[0]);
      // this.profile.profileImage = response.profile.profileImage;
      for (const [key, value] of Object.entries(response.profile)) {
        this.profile[key] = value;
      }
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
}

.profilepage form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.profilepage .profileImage {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}
</style>
