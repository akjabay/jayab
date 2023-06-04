<template>
  <div v-if="item" class="row">
    <div
      class="col"
      :class="$t('direction') == 'rtl' ? 'text-right' : 'text-left'"
    >
      <q-btn :loading="loading.like" size="md" flat round>
        <q-icon
          v-if="isLiked"
          @click="onDislike"
          style="opacity: 0.8"
          class="text-red"
          name="fa-solid fa-heart"
        />
        <q-icon
          v-else
          @click="onLike"
          style="opacity: 0.8"
          name="fa-regular fa-heart"
        />
      </q-btn>
      <q-btn size="md" flat round>
        <q-icon
          @click="onShare"
          :loading="loading.share"
          style="opacity: 0.8"
          name="fa-regular fa-share-from-square"
        />
      </q-btn>
    </div>

    <login-alert-comp ref="loginAlert"></login-alert-comp>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";
import LoginAlertComp from "/src/components/common/LoginAlertComp.vue";
import api from "/src/api/index.js";

export default defineComponent({
  name: "ActionsComp",
  props: {
    item: Object,
  },
  setup() {
    return {
      isLiked: ref(false),
      loading: ref({
        like: false,
        share: false,
      }),
    };
  },
  components: {
    LoginAlertComp,
  },
  methods: {
    checkIsLiked(i) {
      i ? i++ : (i = 1);
      if (this.user) {
        if (this.item.likes && this.item.likes.users) {
          const index = this.item.likes.users.findIndex(
            (u) => u.userId == this.user.id
          );
          if (index > -1) {
            this.isLiked = true;
          }
        } else if (i < 10) {
          setTimeout(() => {
            this.checkIsLiked(i);
          }, 1000);
        }
      }
    },
    async onLike() {
      this.loading.like = true;
      if (this.isUserLoggedIn) {
        if (this.item) {
          const id = this.item.id;
          try {
            const result = await api.user.userAddToLikes({ id });
            const likeResult = result.data.data.userAddToLikes;
            if (likeResult.id) {
              this.isLiked = true;
            } else {
              this.$q.notify({
                type: "negative",
                message: this.$t("failed"),
                caption: this.$t("failed"),
              });
            }
          } catch (error) {
            this.loading.like = false;
            console.log(error, "error on fecth data");
            this.$q.notify({
              type: "negative",
              message: this.$t("failed"),
              caption: this.$t("failed"),
            });
          }
        }
      } else {
        this.$refs.loginAlert.onLoginAlert();
      }
      this.loading.like = false;
    },
    async onDislike() {
      this.loading.like = true;
      if (this.isUserLoggedIn) {
        if (this.item) {
          const id = this.item.id;
          try {
            const result = await api.user.userRemoveFromLikes({ id });
            const likeResult = result.data.data.userRemoveFromLikes;
            if (likeResult.id) {
              this.isLiked = false;
            } else {
              this.$q.notify({
                type: "negative",
                message: this.$t("failed"),
                caption: this.$t("failed"),
              });
            }
          } catch (error) {
            this.loading.like = false;
            console.log(error, "error on fecth data");
            this.$q.notify({
              type: "negative",
              message: this.$t("failed"),
              caption: this.$t("failed"),
            });
          }
        }
      } else {
        this.$refs.loginAlert.onLoginAlert();
      }
      this.loading.like = false;
    },
    async onShare() {
      if (this.item) {
        this.loading.share = true;
        const url = window.location.href;
        await navigator.share({ title: this.item.title, url });
        this.loading.share = false;
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["isUserLoggedIn", "user"]),
  },
  mounted() {
    this.checkIsLiked();
  },
});
</script>

<style scoped></style>
