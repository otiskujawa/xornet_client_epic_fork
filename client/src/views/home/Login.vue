  <template>
  <div class="view loginpage">
    <Header/> 
    <form v-on:submit.prevent="login">
      <h1>Welcome Back!</h1>
      <div class="inputField">
        <input v-model="formData.username" class="i" type="text" placeholder="Username">
      </div>
      <div class="inputField">
        <input v-model="formData.password" class="i" type="password" placeholder="Password">
      </div>
      
      <p>don't have account? click <router-link :to="{ name: 'signup'}">here</router-link></p>
      <button type="submit">LOGIN</button>
    </form>
  </div>
</template>

<script>
import Header from '@/components/home/Header';

export default {
    name: 'Login',
    components: {
      Header
    },
    data: () => {
      return {
        formData: {
          username: null,
          password: null,
        }
      }
    },
    methods: {
      async login(){
        const status = await this.api.user.login(JSON.stringify(this.formData));
        if (status == 200) this.$router.push('/dashboard/machines');
      }
    }
}
</script>

<style scoped>
.loginpage {
  min-width: 100%;
  min-height: 100%;
  background-color: var(--black);
  position: relative;
  height: 100%;
}

.loginpage form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>