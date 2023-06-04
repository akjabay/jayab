<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <v-col cols="12" lg="4" md="6" sm="8" xs="11">
        <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              کاربر جدید
            </h3>
            <h6 class="subtitle-2 font-weight-light">
              افزودن کاربر با استفاده از ایمیل
            </h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              type="text"
              v-model="name"
              label="نام کامل"
              :rules="[
                rules.required,
                rules.min4,
              ]"
              filled
              background-color="transparent"
            ></v-text-field>
            <v-text-field
              type="text"
              v-model="user"
              label="ایمیل"
              :rules="[
                rules.required,
                rules.emailMatchOnly,
              ]"
              filled
              background-color="transparent"
            ></v-text-field>
            <v-text-field
              type="text"
              v-model="username"
              label="انتخاب نام کاربری"
              :rules="[
                rules.required,
                rules.min4,
              ]"
              :hint="unhint"
              :error="!unconfirm"
              :color="unconfirm ? 'success' : 'error'"
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

            <v-btn
              @click="addUser"
              class="text-capitalize mt-5 element-0"
              color="primary"
            >
              تایید و افزودن
            </v-btn>
          </v-card-text>
        </v-card>

        <AlertComponent
          v-if="alert_msg"
          :alertMsg="alert_msg"
          :alertType="alert_type"
        >
        </AlertComponent>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api/index.js';

export default {
  name: "UserAdd",

  data: () => ({
    user: "",
    username: "",
    name: "",
    password: "",
    code: "",
    show1: false,
    rules: {
      required: (value) => !!value || "فیلد ضروری!",
      min: (v) => v.length >= 8 || "حداقل ۸ کاراکتر!",
      min4: (v) => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
      min11: (v) => v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
      emailMatch: (v) =>
        !v.includes("@") ||
        /\S+@\S+\.\S+/.test(v) ||
        "ایمیل را درست وارد کنید!",
      emailMatchOnly: (v) =>
        !isNaN(v) ||
        /\S+@\S+\.\S+/.test(v) ||
        "ایمیل را درست وارد کنید!",
    },
    unhint: "نام کاربری مورد تایید نیست",
    unconfirm: false,
    alert_msg: "",
    updated_at: "",
    newusermsg: "",
  }),
  components: {
    AlertComponent: () => import("@/components/sdComponents/AlertComponent"),
  },
  methods: {
    async addUser () {
      this.alert_msg = "";
      this.alert_type = null;
      let signup_type;
      isNaN(this.user)
        ? /\S+@\S+\.\S+/.test(this.user)
          ? (signup_type = "email")
          : (signup_type = undefined)
        : (signup_type = "phone");
      if (signup_type) {
        try {
          const result = await api.user.userCreate({
            signup_type,
            user: this.user,
            username: this.username,
            name: this.name,
            password: this.password
          });
          if (result.data.data.userCreate.id) {
            this.alert_type = "success";
            this.alert_msg = "کاربر جدید با موفقیت اضافه شد.";
          } else {
            this.alert_type = "error";
            this.alert_msg = "اطلاعات وارد شده صحیح نیست.";
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.alert_type = "error";
        this.alert_msg = "فیلدها معتبر نیست.";
      }
    },

    checkUsername: async function () {
      if (this.username.length >= 5) {
        this.unhint = "نام کاربری مورد تایید نیست";
        this.unconfirm = false;
        try {
          const result = await api.auth.authCheckUsername({ username: this.username });
          if (result.data.data.errors) {
            this.alert_msg = result.data.data.errors[0].message;
          } else if (result.data.data.authCheckUsername === true) {
            this.unhint = "نام کاربری تکراری است";
          } else if (result.data.data.authCheckUsername === false) {
            this.unhint = "نام کاربری مورد تایید است";
            this.unconfirm = true;
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        this.unhint = "نام کاربری حداقل 5 حرف است";
        this.unconfirm = false;
      }
    },
  },
  watch: {
    username: function () {
      this.checkUsername();
    },
  },
};
</script>
