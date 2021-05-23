  <template>
  <div class="view signuppage">
    <Header/> 
    <form v-on:submit.prevent="signup">
      <h1>Welcome Back!</h1>
      <div class="inputField">
        <input v-model="formData.username" class="i" type="text" placeholder="Username">
      </div>
      <div class="inputField">
        <input v-model="formData.email" class="i" type="email" placeholder="Email">
      </div>
      <div class="inputField">
        <input v-model="formData.password" class="i" type="password" placeholder="Password">
      </div>
      <div class="inputField">
        <input v-model="formData.repeatPassword" class="i" type="password" placeholder="Repeat password">
      </div>
      <button type="submit">SIGNUP</button>
    </form>
  </div>
</template>

<script>
import Header from '@/components/home/Header';

export default {
    name: 'Signup',
    components: {
      Header
    },
    data: () => {
      return {
        formData: {
          username: null,
          email: null,
          password: null,
          repeatPassword: null,
        }
      }
    },
    methods: {
      signup(){
        console.log(this.formData);
        this.api.user.signup(this.formData);
      }
    }
}
</script>

<style scoped>
.signuppage {
  min-width: 100%;
  min-height: 100%;
  background-color: var(--black);
  position: relative;
  height: 100%;
}

.signuppage form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>