<template>
  <q-dialog v-model="alert">
    <q-card style="width: 300px">
      <q-card-section :class="$t('direction') == 'rtl' ? 'text-right' : ''">
        <div class="text-h6">{{ "login" }}</div>
      </q-card-section>

      <q-card-section
        :class="$t('direction') == 'rtl' ? 'text-right' : ''"
        class="q-pt-none"
      >
        <div>
          {{ "youHaveToLoginFirst" }}
        </div>
        <div class="q-pt-md text-center">
          <q-btn
            @click="$router.push('/accounts/login')"
            no-caps
            unelevated
            rounded
            color="primary"
            :label="'loginOrSignup'"
          />
        </div>
      </q-card-section>

      <q-card-actions :align="$t('direction') == 'rtl' ? 'left' : 'right'">
        <q-btn flat :label="'ok'" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginAlertComp",
  props: {},
  setup() {
    return {
      alert: ref(false),
    };
  },
  components: {},
  methods: {
    onLoginAlert() {
      this.alert = true;
    },
  },
});
</script>

<style scoped></style>
