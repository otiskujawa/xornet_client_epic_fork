<template>
    <nav class="columns" :class="{thin: thin}">
        <div class="field hostname">hostname</div>
        <div class="field uuid">uuid</div>
        <div class="field cpuUsage">cpu</div>
        <div class="field ramUsage">ram</div>
        <div class="field disksUsage">disks</div>
        <div class="field networkUsage">Upload</div>
        <div class="field networkUsage">Download</div>
        <div class="field region">Region</div>
        <div class="field uptime">uptime</div>
    </nav>
</template>

<script>
export default {
    name: 'serverListColumns',
}
</script>

<style scoped>

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