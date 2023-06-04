<template>
  <q-page>
    <div class="row justify-center text-center q-mt-xl">
      <div class="col-12 col-md-4 col-sm-6 text-center">
        <main-title-comp :title="$t('login')"></main-title-comp>
        <div class="q-py-sm q-mx-sm">
          <div class="col-12 text-center">
            <q-input
              required
              outlined
              class="q-mt-sm"
              v-model="user"
              :rules="[rules.required]"
              :label="$t('inputUser')"
            ></q-input>
            <q-input
              required
              outlined
              class="q-mt-sm"
              v-model="password"
              type="password"
              :rules="[rules.required]"
              :label="$t('inputPassword')"
            ></q-input>
  
            <q-btn
              :loading="loading"
              @click="login"
              class="full-width q-mt-sm ad-primary-btn"
            >
              {{ $t('login') }}
            </q-btn>
          </div>
        </div>
  
        <q-card bordered class="q-pa-sm q-ma-sm" flat>
          <span>{{ $t('didYouForgetYourPassword') }}</span>
          <q-btn
            no-caps
            dense
            flat
            class="q-mx-xs"
            color="secondary"
            @click="$router.push('/accounts/reset-password')"
            >{{ $t('resetPassword') }}</q-btn
          >
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapActions } from "pinia";
import api from "/src/api/index";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    MainTitleComp,
  },

  setup() {
    return {
      user: ref(""),
      password: ref(""),
      rules: ref({}),
      loading: ref(false),
    };
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser", "setToken"]),

    async login() {
      this.loading = true;
      try {
        let login_type;
        if (!this.user || !this.password) {
          return this.$q.notify({
            type: "warning",
            message: this.$t("failed"),
            caption: this.$t("fillRequiredFields"),
          });
        }
        isNaN(this.user)
          ? /\S+@\S+\.\S+/.test(this.user)
            ? (login_type = "email")
            : (login_type = "username")
          : (login_type = "phone");
        const result = await api.auth.authLogin({
          login_type,
          user: this.user,
          password: this.password,
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "warning",
            message: this.$t("failed"),
            caption: this.$t("informationIsWrong"),
          });
        } else if (result.data.data.authLogin.token) {
          const dbUser = result.data.data.authLogin.user;
          this.setUser(dbUser);
          this.setToken(result.data.data.authLogin.token);
          this.$router.push({
            path: "/",
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        }
      } catch (error) {
        this.loading = false;
        console.log(error, "error on fecth data");
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
      this.loading = false;
    },
  },
  mounted() {
    this.rules = {
      required: (v) => !!v || this.$t("required"),
      min3: (v) => v.length >= 3 || this.$t("min3Character"),
      min8: (v) => v.length >= 8 || this.$t("min8Character"),
      email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
    };
  },
});
</script>
