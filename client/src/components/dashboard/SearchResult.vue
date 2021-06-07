<template>
  <router-link class="searchResult" :to="{ name: 'profile', params: { username: user.username } }">
    <div class="profile">
      <img class="profileImg" :src="user.profileImage?.url ?? 'https://wallpapercave.com/wp/wp8846945.jpg'" alt="user profile image" />
      <div class="user">
        <div class="username">
          <p>{{ user.username }}</p>
          <img class="location" :src="user.geolocation?.countryCode ? require(`@/assets/flags/${user.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
        </div>
        <div class="badges">
          <img class="badge" v-if="user.badges?.owned?.includes('developer')" :src="require(`@/assets/badges/developer.svg`)" />
          <img class="badge" v-if="user.badges?.owned?.includes('designer')" :src="require(`@/assets/badges/designer.svg`)" />
          <img class="badge" v-if="user.badges?.owned?.includes('contributor')" :src="require(`@/assets/badges/contributor.svg`)" />
        </div>
      </div>
    </div>
    <div class="userPoints">
      <p class="p">Points</p>
      <p class="points">{{ user.points }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SearchResult",
  components: {},
  computed: {},
  data() {
    return {};
  },
  props: {
    user: { type: Object, required: true }
  }
};
</script>

<style scoped>
.searchResult {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  gap: 8px;
  text-align: left;

  transition: 300ms ease;
}

.searchResult:hover {
  /* Shadow */
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}

.userPoints {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.userPoints .p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  /* identical to box height, or 13px */

  display: flex;
  align-items: flex-end;

  left: 0px;
  color: var(--black);
}

.userPoints .points {
  background: linear-gradient(90deg, #db00ff 0%, #8000ff 31.77%, #00b2ff 64.06%, #00fff0 98.44%);
  background-clip: border-box;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Work Sans;
  font-weight: 600;
  font-size: 16px;

  left: 0px;
}

.searchResult .profile {
  display: flex;
  flex-direction: row;
  width: 40%;
  gap: 8px;
}

.username {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.username img {
  height: 13px;
  border-radius: 2px;
}

.badges {
  display: flex;
  flex-direction: row;
  gap: 8px;

  bottom: 4px;
}

.badge {
  height: 16px;
  width: 16px;
}

.searchResult .profile .profileImg {
  width: 48px;
  height: 48px;
  border-radius: 135.5px;

  object-fit: cover;
}

.searchResult .profile .user {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px 0px;
  width: 40%;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  /* identical to box height, or 13px */

  display: flex;

  color: var(--black);
}
</style>
