<template>
  <nav class="serverList" :class="{small: isSmall}">
    <div class="heading">
        <logo/>
        <div class="buttons">
            <router-link to="/" class="button">
                <img :src="require('@/assets/icons/home.png')" alt="">
            </router-link>
            <a href="https://github.com/Geoxor/Xornet/releases" target="_blank" class="button">
                <img :src="require('@/assets/icons/repository.png')" alt="">
            </a>
            <div class="button" @click="toggleDarkmode()">
                <img :src="require('@/assets/icons/darkmode.png')" alt="">
            </div>
            <div class="button" @click="showRogues = !showRogues" :class="{enabled: showRogues}">
                <img :src="require('@/assets/icons/rogue.svg')" alt="">
            </div>
            <div class="button" @click="thinButtons = false">
                <img :src="require('@/assets/icons/thick.png')" alt="">
            </div>
            <div class="button" @click="thinButtons = true">
                <img :src="require('@/assets/icons/thin.png')" alt="">
            </div>
        </div>
    </div>

    <serverListColumns v-if="thinButtons" :thin="thinButtons"/>

    <section v-if="!thinButtons">
        <img :src="require('@/assets/icons/pm-small.png')" alt="">
        <h1>Physical Machines</h1>
    </section>

    <div class="list">
        <serverListButton :thin="thinButtons" :showDetails="!isSmall" :machine="pm" v-for="pm of showRogues ? pms : pms.filter(pm => !pm.rogue)" :key="pm"/>
    </div>

    <section v-if="!thinButtons">
        <img :src="require('@/assets/icons/vm-small.png')" alt="">
        <h1>Virtual Machines</h1>
    </section>

    <div class="list">
        <serverListButton :thin="thinButtons" :showDetails="!isSmall" :machine="vm" v-for="vm of showRogues ? vms : vms.filter(vm => !vm.rogue)" :key="vm"/>
    </div>

  </nav>
</template>

<script>
import logo from '@/components/logo';
import serverListButton from '@/components/serverListButton';
import serverListColumns from '@/components/serverListColumns';
export default {
    name: 'serverList',
    computed: {
        isSmall: function(){
            return this.$route.params.machine ? true : false;
        }
    },
    data: () => {
        return {
            thinButtons: false,
            showRogues: true,
            darkmode: false,
        }
    },
    components: {
        serverListColumns,
        serverListButton,
        logo
    },
    props: {
        vms: { type: Object, required: false },
        pms: { type: Object, required: false },
    },
    watch:{
        $route (to, from){
            this.isSmall = this.$route.params.machine ? true : false;
        }
    },
    methods: {
        toggleDarkmode(){
            if(!this.darkmode){
                document.documentElement.style.setProperty('--background-color', '#0d1117');
                document.documentElement.style.setProperty('--white', '#161b22');
                document.documentElement.style.setProperty('--black', '#fff');
                document.documentElement.style.setProperty('--slyColor', '#fff');
                document.documentElement.style.setProperty('--rogue-red', '#2d0000');
                document.documentElement.style.setProperty('--rogue-red-border', '#870000');
                document.documentElement.style.setProperty('--rogue-red-active', '#480000');
                document.documentElement.style.setProperty('--filter', 1);
                this.darkmode = true;
            } else {
                document.documentElement.style.setProperty('--background-color', '#fff');
                document.documentElement.style.setProperty('--white', '#f6f6f6');
                document.documentElement.style.setProperty('--black', '#000');
                document.documentElement.style.setProperty('--slyColor', '#414569');
                document.documentElement.style.setProperty('--rogue-red', '#ffb1b1');
                document.documentElement.style.setProperty('--rogue-red-border', '#ff0000');
                document.documentElement.style.setProperty('--rogue-red-active', '#ff9999');
                document.documentElement.style.setProperty('--filter', 0);
                this.darkmode = false;
            }
        }
    }
}
</script>

<style scoped>



.serverList {
    width: 100%;
    min-width: 100%;
    height: 100%;
    flex-direction: column;
    font-family: 'Work Sans', sans-serif;
    padding: 0px 8px;
    background-color: var(--background-color);
    transition: 200ms ease;
    overflow-x: hidden;
}

.serverList.small {
    width: 320px;
    min-width: 320px;
}

.serverList .heading {
    width: 100%;
    padding: 8px 0px;
    display: flex;
    justify-content: space-between;
}

.serverList .heading .buttons {
    gap: 4px;
    display: flex;
}

.serverList .heading .buttons .button {
    padding: 8px;
    background-color: var(--background-color);
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    gap: 8px;
    cursor: pointer;
    transition: 100ms ease;
    text-decoration: none;
    user-select: none;
}

.serverList .heading .buttons .button:hover {
    border: 1px solid var(--white);
    transform: translateY(-1px);
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

.serverList .heading .buttons .button:active {
    transform: translateY(-0px);
}
.serverList .heading .buttons .button.enabled {
    background-color: var(--rogue-red-border);
}

.serverList .heading .buttons .button img {
    width: 24px;
    height: 24px;
    filter: invert(var(--filter));
}

.serverList section {
    height: 32px;
    width: 100%;
    display: flex;
    padding: 8px;
    gap: 8px;
}

.serverList section img {
    height: 16px;
}

.serverList section h1 {
    text-transform: uppercase;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 117.9%;
    display: flex;
    align-items: center;
    text-align: center;
    color: var(--slyColor);;
}

.serverList .list {
    flex-direction: column;
    display: flex;
    /* gap: 4px; */
}

</style>