<template>
  <div class="search" :class="{ onfocus: searchString.length != 0 && !searchPaused }">
    <div class="bar">
      <input v-model="searchString" class="inputField" :class="{ active: searchString.length != 0 }" type="text" placeholder="Search " @keyup="typingTimer()" @keydown="clearTimer()" />
      <img :src="searchString.length != 0 ? require('@/assets/icons/filled/x.svg') : require('@/assets/icons/filled/search.svg')" :class="{ activeImg: searchString.length != 0 }" @click="clearSearchDrop()" />
    </div>
    <div v-if="searchRes">
      <SearchResult v-for="user of searchRes" :key="user" :user="user" @click="clearSearchClicked()" />
      <h1 v-if="searchRes.length == 0 && searchString.length != 0" class="noResult">There were no users that match that query</h1>
    </div>
  </div>
</template>

<script>
import SearchResult from "@/components/dashboard/SearchResult";

export default {
  name: "SearchBar",
  components: {
    SearchResult
  },
  computed: {},
  watch: {
    searchString(to, from) {
      if (to == "") {
        this.clearSearchDrop();
        this.searchRes = null;
      }
    }
  },
  data() {
    return {
      searchRes: null,
      timer: null,
      searchString: "",
      searchPaused: true
    };
  },
  mounted() {},
  methods: {
    async doneTyping() {
      if (this.searchString == "") return;
      this.searchRes = await this.api.user.search(this.searchString.trim());
      console.log(this.searchRes);
    },
    typingTimer() {
      if (this.timer != null) clearTimeout(this.timer);
      return (this.timer = setTimeout(this.doneTyping, 500));
    },
    clearTimer() {
      this.searchPaused = false;
      clearTimeout(this.timer);
    },
    clearSearchDrop() {
      this.searchRes = null;
      this.searchPaused = true;
      this.searchString = "";
    },
    clearSearchClicked() {
      this.searchRes = null;
      this.searchPaused = true;
    }
  }
};
</script>

<style scoped>
.search {
  z-index: 10;
  align-self: flex-start;
  display: flex;
  flex-direction: column;

  gap: 8px;
  width: fit-content;
  padding: 8px;
  margin-left: 8px;
  background-color: var(--background-color);

  border-radius: 4px;
}

.search .onfocus {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}

.search .inputField.active {
  width: 500px !important;
}

.search .noResult {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: var(--black);
}

.search .bar {
  display: flex;
  gap: 8px;
  width: fit-content;
  position: relative;
  background-color: var(--background-color);
  border-radius: 3px;
}

.search .bar .inputField {
  width: 300px;
  transition: 100ms ease;
  border-radius: 3px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: var(--black);
  border: none;
  background-color: var(--white);
  height: 32px;
  padding: 6px 8px;
}

.search .bar .inputField:focus {
  width: 500px !important;
}

.search .bar img {
  width: 16px;
  height: 16px;
  filter: invert(var(--filter));
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.search .bar img.activeImg {
  cursor: pointer;
}

.search .bar .inputField::placeholder {
  color: var(--slyColor);
}
</style>
