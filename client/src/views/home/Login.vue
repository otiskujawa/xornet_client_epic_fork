  <template>
  <div class="view loginpage">
    <Header/> 
    <div class="content">
      <LoginCard :image="'https://cdn.discordapp.com/attachments/806300597338767450/846759276889636885/twitch-xqc.gif'" /> 
    </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header';
import LoginCard from '@/components/misc/LoginCard';

export default {
    name: 'Login',
    components: {
      LoginCard,
      Header
    },
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

.loginpage .content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>