<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Dismissible -->
    <!-- ----------------------------------------------------------------------------- -->
    <v-alert
        dark
        dismissible
        v-model="alert"
        border="left"
        close-text="Close Alert"
        :type="alertType ? alertType : 'error'"
        class="font-weight-light mt-4"
    >
    {{ alertMsg }}
    </v-alert>
</template>

<script>
export default {
  name: "AlertDismissible",

  props: {
      alertMsg: {
        type: String,
        default: ''
      },
      alertType: {
        type: String,
        default: 'error'
      },
    },
  data: () => ({
    alert: true,
  }),
};
</script>