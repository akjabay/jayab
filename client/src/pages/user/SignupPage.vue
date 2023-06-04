<template>
  <q-page>
    <div class="row justify-center text-center q-mt-xl">
      <div class="col-12 col-md-4 col-sm-6 text-center">
        <main-title-comp :title="$t('signup')"></main-title-comp>
        <div v-if="form1" class="q-py-sm q-mx-sm">
          <div class="col-12 text-center">
  
            <city-comp
              :items="provinces"
              :item="city"
              v-on:on-select-item="onSelectCity"
            ></city-comp>
  
            <q-input
              outlined
              class="q-mt-sm"
              v-model="name"
              :rules="[rules.required, rules.min3]"
              :label="$t('inputName')"
            ></q-input>
            <q-input
              outlined
              class="q-mt-sm"
              v-model="email"
              :rules="[rules.required, rules.min3, rules.email]"
              :label="$t('inputEmail')"
            ></q-input>
            <q-input
              outlined
              class="col-8"
              type="tel"
              maxlength="11"
              v-model="phone"
              :rules="[rules.required, rules.is11]"
              :label="$t('inputPhone')"
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
  
            <q-btn
              :loading="loading"
              @click="register"
              class="full-width q-mt-sm ad-primary-btn"
            >
              {{ $t('signup') }}
            </q-btn>
          </div>
        </div>
  
        <q-card v-else-if="form2" bordered class="q-pa-sm q-mx-sm" flat>
          <div class="col-12 text-center">
            <div class="text-h5 text-center ad-font-color q-pa-sm q-mb-sm">
              {{ $t('verifyAccount') }}
            </div>
            <q-card-section :style="'direction: ' + $t('direction')">
              <vue-countdown :time="countDownTime" v-slot="{ minutes, seconds }">
                <span class="text-h5 ad-font-color">
                  {{ `${minutes}`.length == 2 ? minutes : "0" + minutes }}:
                  {{ `${seconds}`.length == 2 ? seconds : "0" + seconds }}
                </span>
              </vue-countdown>
            </q-card-section>
            <q-input
              outlined
              class="q-mt-sm"
              v-model="code"
              :rules="[rules.required]"
              :label="$t('inputVerificationCode')"
            ></q-input>
  
            <q-btn @click="codeVerify" class="full-width q-mt-sm ad-primary-btn">
              {{  $t('submit') }}
            </q-btn>
          </div>
          <q-card-actions>
            <q-space v-if="$t('direction') == 'rtl'" />
            <q-btn
              @click="(form2 = false), (form1 = true)"
              dense
              flat
              color="primary"
            >
              {{ $t('back') }}
            </q-btn>
          </q-card-actions>
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
              @click="register, (disable = true)"
              >{{ $t('tryAgain') }}</q-btn
            >
          </q-card>
        </q-card>
        <q-card bordered class="q-pa-sm q-ma-sm" flat>
          <span>{{ $t('haveAnAccount') }}</span>
          <q-btn
            no-caps
            dense
            flat
            class="q-mx-xs"
            color="primary"
            @click="$router.push('/accounts/login')"
            >{{ $t('login') }}</q-btn
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
import VueCountdown from "@chenfengyuan/vue-countdown";
import CityComp from '/src/components/main/CityComp.vue';

export default defineComponent({
  name: "SignupPage",
  components: {
    MainTitleComp,
    VueCountdown,
    CityComp,
  },

  setup() {
    return {
      name: ref(""),
      email: ref(""),
      phone: ref(""),
      address: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
      city: ref({}),
      provinces: ref([]),
      code: ref(""),
      countDownTime: ref(5 * 60 * 1000),
      rules: ref({}),
      form1: ref(true),
      form2: ref(false),
      user: ref({}),
      disable: ref(false),
      loading: ref(false),
    };
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser", "setToken"]),

    onSelectCity (v) {
      this.city = v;
    },
    async register() {
      this.loading = true;
      try {
        if (this.password != this.confirmPassword) {
          return this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("passwordsAreNotMatch"),
          });
        }
        const result = await api.auth.authSignup({
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          password: this.password,
          cityId: this.city ? this.city.id : '',
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        } else if (result.data.data.authSignup.id) {
          this.user = result.data.data.authSignup;
          this.form1 = false;
          this.form2 = false;
          this.form2 = true;
          this.$q.notify({
            type: "positive",
            message: this.$t("success"),
            caption: this.$t("successRegister"),
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

    async codeVerify() {
      this.loading = true;
      try {
        const result = await api.auth.authVerify({
          email: this.email,
          password: this.password,
          code: this.code,
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        } else if (result.data.data.authVerify.token) {
          const dbUser = result.data.data.authVerify.user;
          this.setUser(dbUser);
          this.setToken(result.data.data.authVerify.token);
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
        console.log(error, "error on fecth data");
        this.loading = false;
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
      this.loading = false;
    },
    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = options;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = options.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    async fetchData () {
      try {
        const _result = await api.main.getProvinces();
          if (_result.status === 200) {
            const provinces = _result.data.data;
            this.provinces = provinces;
          }
      } catch (error) {
        const err = new Error(error);
        console.log(err);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    }
  },
  mounted() {
    this.rules = {
      required: (v) => !!v || this.$t("required"),
      min3: (v) => v.length >= 3 || this.$t("min3Character"),
      min8: (v) => v.length >= 8 || this.$t("min8Character"),
      is11: (v) => v.length == 11 || this.$t("is11Character"),
      email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
    };
    this.fetchData();
  },
});
</script>
