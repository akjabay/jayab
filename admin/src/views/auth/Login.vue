<template>
  <v-container fluid class="down-top-padding">
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        lg="4"
        md="6"
        sm="8"
        xs="11"
      >
        <v-card>
          <v-card-text>
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">ورود</h3>
            <h6 class="subtitle-2 font-weight-light">ورود با استفاده از نام کاربری، شماره موبایل یا ایمیل</h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              type="text"
              v-model="user"
              label="نام کاربری، موبایل یا ایمیل"
              :rules="[rules.required, rules.min4, rules.min11, rules.emailMatch]"
              filled
              background-color="transparent"
            ></v-text-field>
            <v-text-field
              v-model="password"
              filled
              background-color="transparent"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="رمز ورود"
              hint="رمز ورود حداقل ۸ حرفی است."
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <AlertComponent
              v-if="alertMsg"
              :alertMsg="alertMsg"
              alertType="error">
            </AlertComponent>
            <v-btn @click="login" class="text-capitalize mt-5 element-0" color="success">ورود</v-btn>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
  name: "Login",

  data: () => ({
    user: "",
    password: "",
    show1: false,
    rules: {
      required: value => !!value || "فیلد ضروری!",
      min: v => v.length >= 8 || "حداقل ۸ کاراکتر!",
      min4: v => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
      min11: v => v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
      emailMatch: v => !v.includes('@') || /\S+@\S+\.\S+/.test(v) || "ایمیل را درست وارد کنید!"
    },
    alertMsg: '',
  }),
  components: {
    AlertComponent: () => import('@/components/sdComponents/AlertComponent'),
  },
  methods: {
    async login () {
      this.alertMsg = null
      let login_type;
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
        this.alertMsg = 'کاربری یافت نشد'
      } else if (result.data.data.authLogin.token) {
        const token = result.data.data.authLogin.token
        this.$store.dispatch('auth/setUser', result.data.data.authLogin.user)
        this.$store.dispatch('auth/setToken', token)
        this.$store.commit("SET_SIDEBAR_DRAWER", true)
        this.$router.push({
          path: '/views/dashboard/index'
        })
      } else {
        this.alertMsg = 'مشخصات وارد شده صحیح نیست'
      }
    }
  }
};
</script>
