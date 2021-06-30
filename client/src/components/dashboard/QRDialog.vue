<template>
  <Card>
      <div class="flex mb-3 items-center">
        <h1 class="text-left text-xl flex-1">QR Code</h1>
        <div class="flex gap-1">
            <ShadowButton icon="save" title="Save" @click="saveQR()"/>
            <ShadowButton icon="print" title="Print" @click="printQR()"/>
        </div>
      </div>
      <img :src="qrCode" class="w-full rounded-8px"/>
  </Card>
</template>

<script lang="ts" setup>
import QRCode from 'qrcode';
import Card from '@/components/library/Card.vue';
import ShadowButton from "@/components/dashboard/ShadowButton.vue";
import { onMounted, ref, defineProps } from "vue";
import { useRoute } from 'vue-router';

const props = defineProps<{ name: string }>();

const route = useRoute();

const qrCode = ref<string | undefined>(undefined);
async function genQR() {
    // Upscale or make this an SVG somehow
    qrCode.value = await QRCode.toDataURL(window.location.href);
}
function saveQR() {
    if(!qrCode.value) return;
    const a = document.createElement("a");
    a.href = qrCode.value;
    a.download = `${props.name}.png`;
    a.click();
}
function printQR() {
    if(!qrCode.value) return;
    const toPrint = window.open("", "Image");
    if(!toPrint) return;
    toPrint.document.write(`<img src='${qrCode.value}' style="width: 100%;">`);
    toPrint.print();
}
onMounted(() => {
    genQR();
})
</script>