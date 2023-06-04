<template>
  <q-header
    reveal
    bordered
    :class="$q.dark.isActive ? 'ad-toolbar-dark' : 'ad-toolbar'"
  >
    <q-toolbar>
      <q-toolbar-title @click="$router.push('/')" class="text-pointer">
        <q-img class="q-mx-sm" width="40px" src="icons/favicon-128x128.png" />
        <span>{{ $t('jayab') }}</span>
        
      </q-toolbar-title>

      <div class="row" v-if="$q.screen.gt.xs">
        <div
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/')"
          @click="$router.push('/')"
        >
          {{ $t("home") }}
        </div>
        <div
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/items', ['/items/list', '/items/map'])"
          @click="$router.push('/items/list')"
        >
          {{ $t("publicProducts") }}
        </div>
        <div
          v-if="isRealStateOwner"
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/accounts/plus', ['/accounts/plus/manage-map', '/accounts/plus/manage-list'])"
          @click="$router.push('/accounts/plus')"
        >
          {{ $t("manage") }}
        </div>
      </div>

      <q-space v-if="$q.screen.gt.xs" />
      <q-space v-if="$q.screen.gt.xs" />

      <div>
        <dark-comp :isDense="true"></dark-comp>
      </div>

      <div v-if="!isUserLoggedIn">
        <q-btn class="ad-secondary-btn q-mx-xs" outline to="/accounts/login">
          {{ $t("login") }}
        </q-btn>
        <q-btn class="ad-primary-btn" to="/accounts/signup">
          {{ $t("signup") }}
        </q-btn>
      </div>
      <div v-else>
        <q-btn-dropdown class="q-ml-xs q-pl-xs" flat round>
          <template v-slot:label>
            <div v-if="user">
              <q-icon size="sm" name="account_circle"></q-icon>
            </div>
          </template>

          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemClick('/accounts/profile/' + user.username)"
            >
              <q-item-section avatar>
                <q-avatar icon="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="onItemClick('/accounts/subscription')"
            >
              <q-item-section avatar>
                <q-avatar icon="fa fa-plus-square" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("plusSubscription") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onLogout">
              <q-item-section avatar>
                <q-avatar icon="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("logout") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
    <q-toolbar v-if="$q.screen.lt.sm" class="text-primary justify-center">
      <div class="row justify-center">
        <div
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/')"
          @click="$router.push('/')"
        >
          {{ $t("home") }}
        </div>
        <div
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/items', ['/items/list', '/items/map'])"
          @click="$router.push('/items/list')"
        >
          {{ $t("publicProducts") }}
        </div>
        <div
          v-if="isRealStateOwner"
          class="ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1"
          :class="isRouteActive('/accounts/plus', ['/accounts/plus/manage-map', '/accounts/plus/manage-list'])"
          @click="$router.push('/accounts/plus')"
        >
          {{ $t("manage") }}
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState, mapActions } from "pinia";
import DarkComp from "/src/components/common/DarkComp.vue";
import api from "/src/api/index";

export default defineComponent({
  name: "AppHeader",
  props: {},
  components: {
    DarkComp,
  },
  setup() {
    return {
      isBackExists: ref(false),
      isRealStateOwner: ref(false)
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["clearAuth", "tryAutoLogin", "setUser"]),
    onItemClick(route) {
      this.$router.push(route);
    },
    onLogout() {
      this.clearAuth();
      this.$router.push("/accounts/login");
    },
    isRouteActive(route, routes = []) {
      const currentRoute = this.$route.matched[1].path;
      return currentRoute == route || routes.includes(this.$route.path) ? "active" : "";
    },
    onSetLocals() {
      const lang = localStorage.getItem("locale");
      if (lang) {
        this.$i18n.locale = lang;
      } else {
        this.$i18n.locale = "fa-IR";
      }
      const mode = localStorage.getItem("mode");
      if (mode) {
        this.$q.dark.set(mode == "true" ? true : false);
      }
    },

    async fetchData() {
      if (this.isUserLoggedIn) {
        try {
          const result = await api.auth.authFindMe();
          if (result.data.errors) {
            this.$q.notify({
              type: "warning",
              message: this.$t("failed"),
              caption: this.$t("userNotFound"),
            });
          } else if (result.data.data.authFindMe.id) {
            const fetchedUser = result.data.data.authFindMe;
            this.setUser(fetchedUser);
          }
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        }
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["isUserLoggedIn", "user"]),
  },
  mounted() {
    this.tryAutoLogin();
    this.onSetLocals();
    // this.fetchData();
    this.isBackExists =
      this.$router.options &&
      this.$router.options.history &&
      this.$router.options.history.state &&
      this.$router.options.history.state.back;

      if (this.user && this.user.permissions) {
        this.isRealStateOwner = this.user.permissions.find((p) => p.codename === 'write product');
      }
  },
  beforeMount() {},
});
</script>
