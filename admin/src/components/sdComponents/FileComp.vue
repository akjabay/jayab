<template>
    <v-card @click="onDownload" :elevation="1" class="text-center ma-1 pa-2 rounded-lg cyan lighten-5 pointer">
      <v-icon>mdi-file</v-icon>
      <div>
        {{ file.url.split('.')[1] }}
      </div>
      <v-tooltip class="">
        دانلود
      </v-tooltip>
    </v-card>
</template>

<script>

export default {
  name: "FileComp",
  props: {
    file: Object,
  },
  methods: {
    async onDownload () {
      window.open(this.$store.state.auth.baseURL +'/public/' + this.file.url, '_blank')
    }
  }
}
</script>
