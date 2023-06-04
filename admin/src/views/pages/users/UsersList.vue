<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <BaseCard heading="لیست همه کاربران">
          <UsersTbl
            v-if="users[0]"
            v-bind:users="users"
            v-bind:pagination="pagination"
            v-on:fetch-users="fetchUsers"
            v-on:view-user="viewUser"
          >
          </UsersTbl>
          <div v-else class="flex flex-center text-center">
            <p>کاربری موجود نیست.</p>
          </div>
        </BaseCard>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          جزئیات کاربر
        </v-card-title>

        <v-card-text class="py-4">
          شناسه: {{ showingUser.id }}<br />
          نام کاربری: {{ showingUser.username }}<br />
        </v-card-text>
        <v-card-text
          class="py-4"
        >
          <div>
            دسترسی ها: 
          </div>
          <div v-if="showingUser.permissions && showingUser.permissions[0]">
            <span v-for="(pm, i) in showingUser.permissions" :key="i">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
              >
                {{ pm.persian_codename }}
              </v-chip>
            </span>
          </div>
          <div v-else>
            -دسترسی افزوده نشده-
          </div>
        </v-card-text>
        <v-card-text class="pb-4">
          <div>
            <span>وضعیت: </span>
            <span v-show="showingUser.status_auth === 'active'">فعال</span>
            <span v-show="showingUser.status_auth === 'inactive'">فعال نشده</span>
            <span v-show="showingUser.status_auth === 'limited'">مسدود شده</span>
          </div>
          <div>
            تاریخ عضویت: {{ Math.ceil(Number(showingUser.createdAt ) / 1000) | moment("jYYYY-jMM-jDD HH:MM") }}
          </div><br />
        </v-card-text>
        
        <hr class="style-one">
        
        <v-card-actions>
              <v-btn
                v-if="showingUser.status_auth === 'deleted'"
                text
                color="success"
                @click="deletedialog = !deletedialog"
              >
                  <v-icon >mdi-checkbox-marked-circle-outline</v-icon>
              </v-btn>
              <v-btn
                v-else
                text
                color="error"
                @click="deletedialog = !deletedialog"
              >
                  <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="black"
                  :disabled="showingUser.status_auth === 'inactive'"
                  @click="toggleUserStatus()"
              >
                <span v-if="showingUser.status_auth !== 'limited'">
                  مسدود کردن
                  <v-icon>mdi-do-not-disturb</v-icon>
                </span>
                <span v-else>
                  آزاد کردن
                  <v-icon>mdi-check-circle</v-icon>
                </span>
              </v-btn>
              <v-btn
                  text
                  color="success"
                  :to="'/views/users/edit/' + showingUser.id"
              >
                ویرایش
                  <v-icon>mdi-pencil</v-icon>
              </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deletedialog"
      width="290"
    >
      <v-card  v-if="this.showingUser.status_auth === 'deleted'">
        <v-card-title class="headline">
          فعال سازی کاربر
        </v-card-title>
        <v-card-text>
          <div class="text-large">
            آیا مایل به فعالسازی کاربر زیر هستید؟
          </div>
          <div class="mt-2">
            <span>
              نام کاربر: 
            </span>
            <span class="px-1">
              {{ this.showingUser.username }}
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deletedialog = false"
          >
            برگشت
          </v-btn>
          <v-btn
            color="success"
            text
            @click="onDeleteUser"
          >
            فعال کردن
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="headline">
          حذف کاربر
        </v-card-title>
        <v-card-text>
          <div class="text-large">
            آیا مایل به حذف کاربر زیر هستید؟
          </div>
          <div class="mt-2">
            <span>
              نام کاربر: 
            </span>
            <span class="px-1">
              {{ showingUser.username }}
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="deletedialog = false"
          >
            برگشت
          </v-btn>
          <v-btn
            color="error"
            text
            @click="onDeleteUser"
          >
            حذف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          بستن
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import api from '@/api/index.js';

export default {
  name: "UsersList",

  data: () => ({
    users: [],
    pagination: {
      limit: 0,
      offset: 0,
      total: 0,
    },
    dialog: false,
    deletedialog: false,
    showingUser: {},
    searchResult: [],
    searchText: "",
    resultText: "",
    snackbar: false,
    snackbar_text: "",
    searchPagination: {
      limit: 0,
      offset: 0,
      total: 0,
    },
  }),
  components: {
    UsersTbl: () => import("@/components/sdComponents/UsersTbl"),
  },
  methods: {
    async toggleUserStatus () {
      const status_auth = this.showingUser.status_auth == "limited" ?
        "active" : "limited";
      const result = await api.user.userUpdateStatus({
        id: this.showingUser.id,
        status_auth: status_auth
      });
      if (result.data.errors) {
          console.log(result.data.errors[0]);
      } else if (result.data.data.userUpdate) {
          this.snackbar = true;
          this.snackbar_text = "تغییر وضعیت با موفقیت ثبت شد."
          this.dialog = false;
          this.fetchUsers();
      }
    },
    
    async onDeleteUser () {
      const status_auth = this.showingUser.status_auth === "deleted" ?
        "active" : "deleted";
      const result = await api.user.userUpdateStatus({
        id: this.showingUser.id,
        status_auth: status_auth
      });
      if (result.data.errors) {
          console.log(result.data.errors[0]);
      } else if (result.data.data.userUpdate) {
          this.snackbar = true;
          status_auth === "deleted"
            ? this.snackbar_text = "کاربر با موفقیت حذف شد."
            : this.snackbar_text = "کاربر با فعال شد."
          this.deletedialog = false;
          this.dialog = false;
          this.fetchUsers();
      }
    },

    async searchUsers (page) {
      const offset = !page ? 0 : (page - 1) * 10;
      const response = await api.user.userSearchAdmin({ searchText: this.searchText, offset, limit: 10 });
      if (response.data.errors) {
        console.log(response.data.errors[0]);
      } else if (response.data.data.userSearch.hits[0]) {
        this.users = response.data.data.userSearch.hits;
        this.pagination = {
          limit: response.data.data.userSearch.pagination.limit,
          offset: response.data.data.userSearch.pagination.offset,
          total: response.data.data.userSearch.pagination.total,
        };
      } else {
        this.resultText = true
      }
    },

    async fetchUsers(page) {
      const offset = !page ? 0 : (page - 1) * 10;
      const status_auth = this.$route.params.status_auth;
      const response = await api.user.userFindAll({ offset, limit: 10, status_auth });
      if (response.data.errors) {
        this.snackbar = true;
        this.snackbar_text = "خطا در دریافت اطلاعات";
        console.log("خطا در دریافت اطلاعات");
      } else if (response.data.data.userFindAll) {
        this.users = response.data.data.userFindAll.hits;
        this.pagination = {
          limit: response.data.data.userFindAll.pagination.limit,
          offset: response.data.data.userFindAll.pagination.offset,
          total: response.data.data.userFindAll.pagination.total,
        };
      } else {
        this.snackbar = true;
        this.snackbar_text = "خطا در دریافت اطلاعات";
        console.log("خطا در دریافت اطلاعات");
      }
    },
    viewUser(id) {
      this.showingUser = this.users.filter((item) => item.id === id)[0];
      this.dialog = true;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
