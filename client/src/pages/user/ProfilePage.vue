<template>
  <q-page>
    <main-title-comp :title="$t('profile')"></main-title-comp>
    <div v-if="loadedUser && loadedUser.id">
      <profile-comp :loadedUser="loadedUser"></profile-comp>
    </div>
    <div v-else>
      <empty-comp></empty-comp>
    </div>
    <q-inner-loading :showing="!loaded" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState, mapActions } from "pinia";
import api from "/src/api/index";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";
import ProfileComp from "/src/components/user/ProfileComp.vue";
import EmptyComp from "/src/components/main/EmptyComp.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    MainTitleComp,
    ProfileComp,
    EmptyComp,
  },

  setup() {
    return {
      loadedUser: ref({}),
      loaded: ref(false),
    };
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser"]),
    async fetchData() {
      try {
        const username = this.$route.params.userId;
        if (username) {
          const result = await api.user.userFind({
            username: username,
          });
          if (result.data.errors) {
            this.$q.notify({
              type: "warning",
              message: this.$t("failed"),
              caption: result.data.errors[0],
            });
          } else if (result.data.data.userFind) {
            this.loadedUser = result.data.data.userFind;
          }
        } else if (!username) {
          const result = await api.auth.authFindMe();
          if (result.data.errors) {
            this.$q.notify({
              type: "warning",
              message: this.$t("failed"),
              caption: this.$t("userNotFound"),
            });
          } else if (result.data.data.authFindMe.id) {
            const fetchedUser = result.data.data.authFindMe;
            this.loadedUser = fetchedUser;
            this.setUser(fetchedUser);
          }
        }
        this.loaded = true
      } catch (error) {
        const err = new Error(error);
        console.log(err);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>
