<template>
    <div
        :class="[
            useToast.toast.show ? 'translate-y-0' : '-translate-y-32'
            ,
            useToast.toast.type === 'error' ? 'shadow-red-600/5 fill-red-500 text-red-500 border-red-300  bg-red-50' :
                useToast.toast.message.includes('welcome') ? 'shadow-emerald-600/5 fill-emerald-500 text-emerald-500 border-emerald-300  bg-emerald-50 '
                    : 'shadow-slate-600/5 fill-slate-500 text-slate-500 border-slate-300  bg-slate-50 '
            ,
            'w-96 h-fit absolute top-10 z-10 rounded-md border  p-4 flex gap-4 transition-all duration-300 ease-in-out shadow-2xl']">
        <times-icon v-if="useToast.toast.type === 'error'" class="w-5 h-5" />
        <span v-else-if="useToast.toast.message.includes('welcome')" class="w-5 h-5 text-md">👋</span>
        <span>{{ useToast.toast.message }}</span>
    </div>
</template>

<script setup>
import timesIcon from '@/assets/icons/timesIcon.vue';
import { useToastStore } from '@/stores/toast';

const useToast = useToastStore()
</script>

<style lang="scss" scoped></style>