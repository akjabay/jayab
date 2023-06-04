<template>
  <v-card color="isbg" flat tile>
    <v-container>
      <v-row>
        <v-col cols="4" class="text-center">
          <v-avatar size="90" v-if="user.avatar_url">
            <img
              :src="
                this.$store.state.auth.baseURL +
                '/public/w90/' +
                user.avatar_url
              "
              :alt="user.username"
            />
          </v-avatar>

          <v-avatar v-else size="90" color="white">
            <v-icon size="70"> mdi-account-circle </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="8">
          <v-row justify="start">
            <div class="text-h4 font-weight-light pr-2">
              <span>{{ user.username }}</span>
            </div>
            <div
              v-if="$store.state.auth.isUserLoggedIn && user.username == $store.state.auth.user.username"
              class="pt-1"
            >
              <v-btn
                to="/accounts/profile/edit"
                class="mx-1"
                outlined
                small
                text
              >
                ویرایش حساب
              </v-btn>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item link @click="logout">
                    <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>خروج</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-row>
          <v-row class="mt-1" justify="start">
            <v-col cols="6" md="3" sm="4" xs="5">
              <span class="font-weight-bold px-2">{{ total ? total : 0 }}</span>
              <span class="">
                <v-icon color="primary"
                  >mdi-checkbox-multiple-marked-circle-outline</v-icon
                >
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ProfileComponent",

  props: {
    user: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({}),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("cart/removeCart");
      this.$router.push({
        path: "/accounts/login",
      });
    },
  },
};
</script>
