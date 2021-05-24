  <template>
  <div class="profilepage">
    <h1>Profile</h1>
    <form v-on:submit.prevent="save()">
      <img class="profileImage" :src="profile?.profileImage ?? 'https://wallpapercave.com/wp/wp8846945.jpg'" alt="" @click="$refs.profileImage.click()">
      <input type="file" id="profileImage" ref="profileImage" name="profileImage" accept="image/*">

      <input v-model="profile.username" class="i" type="text" placeholder="Username">
      <input v-model="profile.email" class="i" type="email" placeholder="Email">
      <button type="submit">SAVE</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'Profile',
    data: () => {
      return {
        profile: {}
      }
    },
    async created(){
      this.profile = await this.api.user.fetchMe();
    },
    methods: {
      async save(){
        await this.api.user.save(Object.assign({}, this.profile), this.$refs.profileImage.files[0]);
      }
    }
}
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
}


</style>