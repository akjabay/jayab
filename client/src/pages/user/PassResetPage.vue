<template>
  <div class="row justify-center text-center q-mt-xl">
    <div class="col-12 col-md-4 col-sm-6 text-center">
      <main-title-comp :title="$t('passwordReset')"></main-title-comp>
      <div v-if="form1" class="q-py-sm q-mx-sm">
        <div class="col-12 text-center">
          <q-input
            required
            outlined
            class="q-mt-sm"
            v-model="email"
            :rules="[rules.required, rules.email]"
            :label="$t('inputEmail')"
          ></q-input>

          <q-btn
            :loading="loading"
            @click="onSubmit"
            class="full-width q-mt-sm ad-primary-btn"
          >
            {{ $t('submit') }}
          </q-btn>
        </div>
      </div>

      <q-card v-else-if="form2" bordered class="q-pa-sm q-mx-sm" flat>
        <div class="col-12 text-center">
          <div class="text-h5 text-center q-pa-sm q-mb-sm">
            {{ $t('verifyCodeAndReset') }}
          </div>
          <q-input
            outlined
            class="q-mt-sm"
            v-model="code"
            :rules="[rules.required]"
            :label="$t('inputVerificationCode')"
          ></q-input>
          <q-input
            outlined
            class="q-mt-sm"
            v-model="password"
            :rules="[rules.required, rules.min8]"
            type="password"
            :label="$t('inputPassword')"
          ></q-input>
          <q-input
            outlined
            class="q-mt-sm"
            v-model="confirmPassword"
            :rules="[rules.required, rules.min8]"
            type="password"
            :label="$t('inputConfirmPassword')"
          ></q-input>

          <q-btn @click="codeVerify" class="full-width q-mt-sm ad-primary-btn">
            {{ $t('submit') }}
          </q-btn>
        </div>
        <q-card bordered class="q-pa-sm q-ma-sm" flat>
          <span>{{ $t('didnotRecieveCode') }}</span>
          <q-btn
            no-caps
            dense
            flat
            :disable="disable"
            :loading="loading"
            class="q-mx-xs"
            color="primary"
            @click="onSubmit, (disable = true)"
            >{{ $t('tryAgain') }}</q-btn
          >
        </q-card>
      </q-card>

      <q-card bordered class="q-pa-sm q-ma-sm" flat>
        <span>{{ $t('dontHaveAnAccount') }}</span>
        <q-btn
          no-caps
          dense
          flat
          class="q-mx-xs"
          color="primary"
          @click="$router.push('/accounts/signup')"
          >{{ $t('signup') }}</q-btn
        >
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapActions } from "pinia";
import api from "/src/api/index";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";

export default defineComponent({
  name: "PassResetPage",
  components: {
    MainTitleComp,
  },

  setup() {
    return {
      email: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
      code: ref(""),
      rules: ref({}),
      form1: ref(true),
      form2: ref(false),
      loading: ref(false),
      disable: ref(false),
    };
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser", "setToken"]),

    async onSubmit() {
      this.loading = true;
      try {
        if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
          this.loading = false;
          return this.$q.notify({
            type: "warning",
            message: "failed",
            caption: "fillRequiredFields",
          });
        }
        const result = await api.auth.authResetPassword({
          email: this.email,
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "negative",
            message: "failed",
            caption: "failed",
          });
        } else if (result.data.data.authResetPassword.id) {
          this.user = result.data.data.authResetPassword;
          this.form1 = false;
          this.form2 = true;
          this.$q.notify({
            type: "positive",
            message: "success",
            caption: "successRegister",
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: "failed",
            caption: "failed",
          });
        }
      } catch (error) {
        this.loading = false;
        console.log(error, "error on fecth data");
        this.$q.notify({
          type: "negative",
          message: "failed",
          caption: "failed",
        });
      }
      this.loading = false;
    },

    async codeVerify() {
      this.loading = true;
      try {
        if (this.password != this.confirmPassword) {
          return this.$q.notify({
            type: "negative",
            message: "failed",
            caption: "passwordsAreNotMatch",
          });
        }
        const result = await api.auth.authResetPasswordVerify({
          email: this.email,
          password: this.password,
          code: this.code,
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "negative",
            message: "failed",
            caption: "failed",
          });
        } else if (result.data.data.authResetPasswordVerify.id) {
          this.$q.notify({
            type: "positive",
            message: "success",
            caption: "successResetPassword",
          });
          this.$router.push({
            path: "/accounts/login",
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: "failed",
            caption: "failed",
          });
        }
      } catch (error) {
        console.log(error, "error on fecth data");
        this.loading = false;
        this.$q.notify({
          type: "negative",
          message: "failed",
          caption: "failed",
        });
      }
      this.loading = false;
    },
  },
  mounted() {
    this.rules = {
      required: (v) => !!v || "required",
      min3: (v) => v.length >= 3 || "min3Character",
      min8: (v) => v.length >= 8 || "min8Character",
      email: (v, rules) => rules.email(v) || "havetoBeValidEmail",
    };
  },
});
</script>
