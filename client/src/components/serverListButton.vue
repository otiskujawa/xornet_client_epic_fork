<template>
    <router-link :to="`/${machine.uuid}`" class="button">
        <img  class="machineType" :src="require(`@/assets/icons/${type}.png`)" alt="">
        <div class="info">
            <h1 class="hostname">{{machine.name}}</h1>
            <h1 class="status">{{machine.uuid}}</h1>
        </div>
        <div class="field cpuUsage" v-if="showDetails">{{machine.cpu}}<strong>%</strong></div>
        <div class="field ramUsage" v-if="showDetails">{{machine.ram.used}}/{{machine.ram.total}}<strong>GB</strong></div>
        <div class="field diskUsage" v-if="showDetails">{{machine.disks.total}}<strong>GB</strong></div>
        <div class="field networkUsage" v-if="showDetails">{{machine.network.RxSec}}<strong>mbps</strong></div>
        <div class="field networkUsage" v-if="showDetails">{{machine.network.TxSec}}<strong>mbps</strong></div>
        <div class="platform">
            <img v-if="machine.platform == 'win32'" :src="require('@/assets/icons/windows-small.png')" alt="">
            <img v-if="machine.platform == 'darwin'" :src="require('@/assets/icons/macos-small.png')" alt="">
            <img v-if="machine.platform == 'linux'" :src="require('@/assets/icons/linux-small.png')" alt="">
            <!-- <img v-if="machine.static.system.manufacturer.startsWith('Raspberry Pi')" :src="require('@/assets/icons/raspberry.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Dell')" style="height: 10px" :src="require('@/assets/icons/dell.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Hewlett-Packard')" :src="require('@/assets/icons/hp.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Gigabyte')" style="height: 7px" :src="require('@/assets/icons/gigabyte.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Asus')" style="height: 7px" :src="require('@/assets/icons/asus.png')" alt=""> -->
            <h1 v-if="machine.reporterVersion">v{{machine.reporterVersion}}</h1>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'serverListButton',
    computed: {
        type: function(){
            return this.machine.isVirtual ? 'vm' : 'pm';
        }
    },
    props: {
        machine: { type: Object, required: true },
        showDetails: { type: Boolean, required: true },
    }
}
</script>

<style scoped>

.button {
    padding: 8px;
    background-color: white;
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

.button:hover {
    border: 1px solid var(--white);
    transform: translateY(-1px);
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

.button:active {
    transform: translateY(-0px);
}

.button.router-link-active {
    background-color: rgb(247, 247, 247);
}

.button img.machineType {
    width: 32px;
    height: 32px;
    filter: invert(1);
}
.button .infofield  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    gap: 2px;
}
.button .info {
    min-width: 200px;
    width: 200px;
}
.button .info .hostname {
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 117.9%;
    text-transform: lowercase;
    color: var(--black);
    text-align: left;
}

.button .info * { width: 100%; }

.button .info .status,
.button .field,
.button .field strong,
.button .platform h1 {
    font-weight: 600;
    font-size: 10px;
    font-family: 'Work Sans', sans-serif;
    color: #414569;
    text-align: left;
}

.button .field {
    text-align: center;
    display: flex;
    align-items: center;
    min-width: 72px;
}

.button .field strong { opacity: .5; }
.button .field.cpuUsage { margin-left: 32px; min-width: 32px; }


.button .info .status {
    background: linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
}

.button .platform {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

.button .platform img {
    width: auto;
    height: 13px;
}

</style>