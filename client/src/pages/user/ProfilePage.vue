<template>
  <q-page>
    <main-title-comp :title="$t('profile')"></main-title-comp>
    <div v-if="loadedUser && loadedUser.id">
      <profile-comp :loadedUser="loadedUser"></profile-comp>
    </div>
    <div v-else>
      <empty-comp></empty-comp>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";
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
    };
  },

  methods: {
    async fetchData() {
      try {
        const id = this.$route.params.userId;
        if (id) {
          const result = await api.user.userFind({
            id: id,
          });
          if (result.data.errors) {
            this.$q.notify({
              type: "warning",
              message: "failed",
              caption: result.data.errors[0],
            });
          } else if (result.data.data.userFind) {
            this.loadedUser = result.data.data.userFind;
          }
        } else if (!id) {
          this.loadedUser = this.user;
        }
      } catch (error) {
        const err = new Error(error);
        console.log(err);
        this.$q.notify({
          type: "negative",
          message: "failed",
          caption: "failed",
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
