<template>
    <div class="zfwrap">
        <zfUpload v-model="filesArr" showPreView :fileSize="20" :fileNum="20" :uploadParameters="uploadParameters" @BackUpload="onGetUpload" :multiple="false" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.zip,.rar,.txt">
            <!-- 自定义插槽样式 -->
        </zfUpload>
        <p class="tips">支持扩展名：.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.zip,.rar</p>
    </div>
</template>
<script>
export default {
    name: 'zfUpload-view',
    data() {
        return {
            filesArr: [],
            uploadParameters: {
                updateUid: '',
            },
        }
    },
    methods: {
        onGetUpload(val) {
            console.log('[ val ]-21', val)
        },
    },
}
</script>
<style lang="scss" scoped></style>
