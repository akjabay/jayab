<template>
  <v-container v-if="loading">
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="subtitle-1 text-center"
        cols="12"
      >
        <v-progress-circular
          indeterminate
          size="35"
          width="2"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoadingComponent",

  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
  }),
};
</script>