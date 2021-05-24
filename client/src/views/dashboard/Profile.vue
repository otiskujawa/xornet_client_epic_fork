  <template>
  <div class="profilepage">
    <h1>Profile</h1>
    <form v-on:submit.prevent="save">
      <img class="pfp" :src="profile?.pfp ?? 'https://wallpapercave.com/wp/wp8846945.jpg'" alt="" @click="$refs.pfp.click()">
      <input type="file" id="myFile" ref="pfp" name="filename">

      <input v-model="profile.username" class="i" type="text" placeholder="Username">
      <input v-model="profile.email" class="i" type="email" placeholder="Email">
      <input v-model="profile.password" class="i" type="password" placeholder="**********">
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
    async save(){
      await this.api.user.fetchMe(this.profile);
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

.profilepage .pfp {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  cursor: pointer;
}


</style>