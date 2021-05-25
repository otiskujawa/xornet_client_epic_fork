  <template>
  <div class="view signuppage">
    <Header/> 
    <div class="content">
      <SignupCard :image="'https://cdn.discordapp.com/attachments/806300597338767450/846781636171006033/paimon.gif'" /> 
    </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header';
import SignupCard from '@/components/misc/SignupCard';

export default {
    name: 'Signup',
    components: {
      SignupCard,
      Header,
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

.signuppage .content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>