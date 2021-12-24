<template>
    <template v-for="(item,i) in devices" :key="i">
        <div>{{item.id}}</div>
        <div>{{item.deviceId}}</div>
        <div>{{item.name}}</div>
        <template v-for="(item,k) in item.roots" :key="k">
            <div>{{item.displayName}}</div>
            <div>{{item.name}}</div>
        </template>

    </template>

</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            devices: [],
            roots: []
        }
    },
    created() {
        this.getDeviceList()
    },
    methods: {
        getDeviceList() {
            axios({
                url: `/api/device/list/?refresh=${this.refresh}`,
                method: "GET"

            }).then(res => {
                if (res.data.success == null || res.data.success == 0) {
                    const data = res.data
                    if (data.result) {
                        const result = data.result
                        if (result.devices) {
                            this.devices = result.devices
                        }
                    }
                } else if (res.data.error) {
                    console.log(res.data.error);
                }
            })
        }

    }

}
</script>

<style scoped>
</style>