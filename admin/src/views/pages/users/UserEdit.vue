<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8" sm="8" xs="11">
        <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              ویرایش کاربر
            </h3>
            <h6 class="font-weight-light">
              ویرایش مشخصات کاربر و افزودن دسترسی ها
            </h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <span>شناسه کاربری: </span>
              <span>{{ this.fetchedUser.id }}</span>
            </div>
            <div>
              <span>نام کاربری کاربر: </span>
              <span>{{ this.fetchedUser.username }}</span>
            </div>
          </v-card-text>
          <v-card-text>
            <v-row justify="center">
                <v-col
                  cols="12"
                  md="8"
                  sm="10"
                >
                    <v-text-field
                    type="text"
                    v-model="user.name"
                    label="نام کامل"
                    :rules="[
                        rules.required,
                        rules.min4,
                    ]"
                    filled
                    background-color="transparent"
                    ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  sm="10"
                >
                    <v-text-field
                    type="text"
                    v-model="user.phone"
                    label="موبایل"
                    :rules="[
                        rules.min11,
                    ]"
                    filled
                    background-color="transparent"
                    ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  sm="10"
                >
                    <v-text-field
                    type="text"
                    v-model="user.email"
                    label="ایمیل"
                    :rules="[
                        rules.emailMatchOnly,
                    ]"
                    filled
                    background-color="transparent"
                    ></v-text-field>
                </v-col>

            </v-row>



            <v-subheader>دسترسی ها</v-subheader>

            <v-row justify="center">
              <v-col
                cols="12"
                md="8"
                sm="10"
              >
                <v-select
                  v-model="selectedPermissions"
                  :items="permissions"
                  item-text="persian_codename"
                  item-value="id"
                  label="دسترسی های کاربر"
                  multiple
                  chips
                  hint="انتخاب دسترسی های کاربر"
                  persistent-hint
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="8"
                sm="10"
              >
                <span class="text-bold">مدیر ویژه</span>
                <v-switch
                  @click="user.is_superuser == 0 ? user.is_superuser = 1 : user.is_superuser = 0;"
                  :input-value="user.is_superuser"
                ></v-switch>
              </v-col>
            </v-row>

            <v-subheader>تغییر رمز ورود</v-subheader>

            <v-row justify="center">
                <v-col
                  cols="12"
                  md="8"
                  sm="10"
                >
                  <v-expansion-panels
                    v-model="panel"
                    hover
                    popout
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        تغییر رمز ورود
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row justify="center">
                          <v-col
                            cols="12"
                            md="8"
                            sm="10"
                          >
                            <v-text-field
                              v-model="user.password"
                              filled
                              background-color="transparent"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="password"
                              label="رمز ورود قبلی"
                              hint="رمز ورود حداقل ۸ حرفی است."
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                            <v-text-field
                              v-model="user.new_password"
                              filled
                              background-color="transparent"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="password"
                              label="رمز ورود جدید"
                              hint="رمز ورود حداقل ۸ حرفی است."
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
            </v-row>

            <v-row>
                <v-spacer></v-spacer>
                <v-btn
                @click="editUser"
                class="text-capitalize mt-5 element-0"
                color="primary"
                >
                ثبت ویرایش
                </v-btn>
            </v-row>
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
  name: "UserEdit",

  data: () => ({
    permissions: [],
    user: {},
    fetchedUser: "",
    selectedPermissions: [],
    show1: false,
    panel: false,
    rules: {
      required: (value) => !!value || "فیلد ضروری!",
      min: (v) => !v || v.length >= 8 || "حداقل ۸ کاراکتر!",
      min4: (v) => !v || v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
      min11: (v) => !v || v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
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
    alert_type: "",
    alert_msg: "",
    updated_at: "",
    newusermsg: "",
  }),
  components: {
    AlertComponent: () => import("@/components/sdComponents/AlertComponent"),
  },
  methods: {
    async editUser() {
      this.alert_msg = "";
      this.alert_type = '';
      const userId = this.$route.params.userId;
      try {
        const result = await api.user.userUpdateAdmin({
          id: userId,
          phone: this.user.phone ? this.user.phone: '',
          email: this.user.email ? this.user.email: '',
          name: this.user.name ? this.user.name: '',
          password: this.user.password ? this.user.password: '',
          new_password: this.user.new_password ? this.user.new_password: '',
          is_superuser: this.user.is_superuser ? this.user.is_superuser: '',
          permissions: this.selectedPermissions,
        });
        if (result.data.data.userUpdate.id) {
          this.alert_type = "success";
          this.alert_msg = "مشخصات کاربر با موفقیت ویرایش شد.";
        } else {
          this.alert_type = "error";
          this.alert_msg = "اطلاعات وارد شده صحیح نیست.";
        }
      } catch (error) {
        console.error(error);
      }
    },

    fetchUser: async function () {
        const username = this.$route.params.userId;
        try {
          const result = await api.user.userFind({ username })
          if (result.data.data.errors) {
            this.alert_msg = result.data.data.errors[0].message;
          } else if (result.data.data.userFind) {
            this.fetchedUser = result.data.data.userFind;
            this.selectedPermissions = this.fetchedUser.permissions.map((pm) => {
              return pm.id;
            });
            this.user = this.fetchedUser;
          }
        } catch (error) {
          console.error(error);
        }
    },

    fetchPermissions: async function () {
        try {
          const result = await api.main.permissionFindAll();
          if (result.data.data.errors) {
            this.alert_msg = result.data.data.errors[0].message;
          } else if (result.data.data.permissionFindAll) {
            this.permissions = result.data.data.permissionFindAll
          }
        } catch (error) {
          console.error(error);
        }
    },
  },
  created () {
      this.fetchUser()
      this.fetchPermissions()
  },
};
</script>
