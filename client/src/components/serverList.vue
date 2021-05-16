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
            <div v-if="thinButtons" class="button" @click="thinButtons = false">
                <img :src="require('@/assets/icons/thick.png')" alt="">
            </div>
            <div v-if="!thinButtons" class="button" @click="thinButtons = true">
                <img :src="require('@/assets/icons/thin.png')" alt="">
            </div>
        </div>
    </div>

    <nav v-if="thinButtons" class="columns" :class="{thin: thin}">
        <div @click="sort('hostname')" class="field hostname">hostname <img v-if="sortingMethod == 'hostname'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('uuid')"     class="field uuid">uuid <img v-if="sortingMethod == 'uuid'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('cpu')"      class="field cpuUsage">cpu  <img v-if="sortingMethod == 'cpu'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('ram')"      class="field ramUsage">ram  <img v-if="sortingMethod == 'ram'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('disks')"    class="field disksUsage">disks  <img v-if="sortingMethod == 'disks'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('upload')"   class="field networkUsage">Upload   <img v-if="sortingMethod == 'upload'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('download')" class="field networkUsage">Download <img v-if="sortingMethod == 'download'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('region')"   class="field region">Region <img v-if="sortingMethod == 'region'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('ping')"     class="field ping">ping <img v-if="sortingMethod == 'ping'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
        <div @click="sort('uptime')"   class="field uptime">uptime <img v-if="sortingMethod == 'uptime'" :src="sortingDirection ? require('@/assets/icons/chevron-up.png') :  require('@/assets/icons/chevron-down.png')" alt=""></div>
    </nav>

    <section v-if="!thinButtons">
        <img :src="require('@/assets/icons/pm-small.png')" alt="">
        <h1>Physical Machines</h1>
    </section>

    <div class="list">
        <serverListButton :thin="thinButtons" :showDetails="!isSmall" :machine="machine" v-for="machine of showRogues ? sortedMachines : sortedMachines.filter(machine => !machine.rogue)" :key="machine"/>
    </div>

  </nav>
</template>

<script>
import logo from '@/components/logo';
import serverListButton from '@/components/serverListButton';
export default {
    name: 'serverList',
    computed: {
        isSmall: function(){
            return this.$route.params.machine ? true : false;
        },
    },
    data: () => {
        return {
            thinButtons: false,
            showRogues: true,
            darkmode: false,
            sortingMethod: 'hostname',
            sortingDirection: true,
            sortedMachines: [],
        }
    },
    components: {
        serverListButton,
        logo
    },
    props: {
        machines: { type: Object, required: false },
    },
    watch:{
        $route(to, from){
            this.isSmall = this.$route.params.machine ? true : false;
        },
        machines(to, from){
            this.switchSorting(this.sortingMethod);
        },
        sortingMethod(to, from){
            this.switchSorting(to, from);
        },
        sortingDirection(to, from){
            this.switchSorting(this.sortingMethod);
        },
    },
    methods: {
        sort(field){
            if (field == this.sortingMethod) this.sortingDirection = !this.sortingDirection;
            else this.sortingDirection = false;
            this.sortingMethod = field;
        },
        switchSorting(sortBy) {
            const sortingAlgorithms = {
                hostname: (a, b) => {
                    if(a.hostname < b.hostname || b.hostname == "" || !b.hostname) return -1;
                    if(a.hostname > b.hostname) return 1;
                    return 0;
                },
                uuid: (a, b) => {
                    if(a.uuid < b.uuid) return -1;
                    if(a.uuid > b.uuid) return 1;
                    return 0;
                },
                cpu: (a, b) => {
                    if(a.cpu < b.cpu) return -1;
                    if(a.cpu > b.cpu) return 1;
                    return 0;
                },
                ram: (a, b) => {
                    if(a.ram.used < b.ram.used) return -1;
                    if(a.ram.used > b.ram.used) return 1;
                    return 0;
                },
                disks: (a, b) => {
                    if(a.disks.use < b.disks.use) return -1;
                    if(a.disks.use > b.disks.use) return 1;
                    return 0;
                },
                upload: (a, b) => {
                    if(a.network.TxSec < b.network.TxSec) return -1;
                    if(a.network.TxSec > b.network.TxSec) return 1;
                    return 0;
                },
                download: (a, b) => {
                    if(a.network.RxSec < b.network.RxSec) return -1;
                    if(a.network.RxSec > b.network.RxSec) return 1;
                    return 0;
                },
                region: (a, b) => {
                    if(a.geolocation.countryCode < b.geolocation.countryCode) return -1;
                    if(a.geolocation.countryCode > b.geolocation.countryCode) return 1;
                    return 0;
                },
                ping: (a, b) => {
                    if(a.ping < b.ping || isNaN(b.ping)) return -1;
                    if(a.ping > b.ping) return 1;
                    return 0;
                },
                uptime: (a, b) => {
                    if(a.uptime.pure < b.uptime.pure) return -1;
                    if(a.uptime.pure > b.uptime.pure) return 1;
                    return 0;
                },
            }

            let sortedArray = this.machines.sort((a, b) => sortingAlgorithms[sortBy](a, b));

            if (!this.sortingDirection) this.sortedMachines = sortedArray.reverse();
            this.sortedMachines = sortedArray;
        },
        toggleDarkmode(){
            if(!this.darkmode){

                // this switches the colors on the :root of the css to the darkmode variables

                document.documentElement.style.setProperty('--background-color', 'var(--darkmode-background-color)');
                document.documentElement.style.setProperty('--white',            'var(--darkmode-white)');
                document.documentElement.style.setProperty('--black',            'var(--darkmode-black)');
                document.documentElement.style.setProperty('--slyColor',         'var(--darkmode-slyColor)');
                document.documentElement.style.setProperty('--rogue-red',        'var(--darkmode-rogue-red)');
                document.documentElement.style.setProperty('--rogue-red-active', 'var(--darkmode-rogue-red-active)');
                document.documentElement.style.setProperty('--filter',           1);
                this.darkmode = true;
            } else {

                // im sure this can be improved by persisting initial colors on 
                // the :root as well and just switching between them instead of hardcoding this
                // kinda like how it does it above with the var(--);

                document.documentElement.style.setProperty('--background-color', '#fff');
                document.documentElement.style.setProperty('--white',            '#f6f6f6');
                document.documentElement.style.setProperty('--black',            '#000');
                document.documentElement.style.setProperty('--slyColor',         '#414569');
                document.documentElement.style.setProperty('--rogue-red',        '#ffeef0');
                document.documentElement.style.setProperty('--rogue-red-active', '#fdaeb7');
                document.documentElement.style.setProperty('--filter',           0);
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

.columns {
    padding: 8px;
    background-color: var(--background-color);
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    gap: 8px;
    transition: 100ms ease;
    text-decoration: none;
    overflow: hidden;
    user-select: none;
}
.columns .field,
.columns .field strong {
    font-weight: 500;
    font-size: 11px;
    font-family: 'Work Sans', sans-serif;
    color: var(--slyColor);;
    min-width: fit-content;
    text-align: left;
}

.columns .field {
    text-align: center;
    display: flex;
    align-items: center;
    min-width: 72px;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
}

.columns .field:hover {
    color: rgb(255, 0, 179);
}

.columns .field img {
    width: 8px;
    filter: invert(var(--filter));
    margin-left: 8px;
}

.columns .field strong { opacity: .5; }
.columns .field.cpuUsage { margin-left: 32px; min-width: 32px; }

.columns .field.hostname {
    margin-left: 24px;
    min-width: 100px;
}

.columns .field.uuid {
    margin-left: 24px;
    min-width: 216px;
    justify-content: flex-end;
}

.columns .field.region {
    min-width: 48px;
}


</style>