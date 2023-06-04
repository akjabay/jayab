<template>
  <q-page>
    <main-title-comp :title="$t('plusSubscription')"></main-title-comp>
    <sub-title-comp :title="$t('services')"></sub-title-comp>

    <div class="">
      <q-card
        v-for="(service, i) in services" :key="i"
        flat
        class="col-12 col-md-4 col-sm-6 col-xs-12 q-ma-sm q-pa-sm ad-box-bordered"
      >
        <q-card-section>
          {{ service.persian_codename }}
        </q-card-section>
        <q-card-section v-for="(access, j) in service.persian_accesses.split(',')" :key="j">
          {{ '✅ ' + access }}
        </q-card-section>
        <q-card-actions :align="($t('direction') === 'rtl' ? 'right' : 'left')">
            <q-btn @click="onActivate({ id: service.id })" class="ad-primary-btn" :label="$t('activate')" />
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapActions } from "pinia";
import api from "/src/api/index";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";
import SubTitleComp from "/src/components/main/SubTitleComp.vue";

export default defineComponent({
  name: "SubscriptionPage",
  components: {
    MainTitleComp,
    SubTitleComp,
  },

  setup() {
    return {
      name: ref(""),
      email: ref(""),
      token: ref(""),
      uid: ref(""),
      configUrl: ref(""),
      price: ref(""),
      rules: ref({}),
      user: ref({}),
      services: ref([]),
      disable: ref(false),
      loading: ref(false),
    };
  },

  methods: {
    onActivate: function (args = []) {
      const { id } = args;
      this.$router.push('/accounts/subscription/' + id);
    },
    fetchData: async function () {
      try {
        const result = await api.main.getServices();
        this.services = result.data.data.serviceFindAll;
        this.loaded = true;
      } catch (error) {
        console.log(error, "error on fecth data");
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
    this.rules = {
      required: (v) => !!v || "required",
      min3: (v) => v.length >= 3 || "min3Character",
      min8: (v) => v.length >= 8 || "min8Character",
      is10: (v) => v.length == 10 || "is10Character",
      email: (v, rules) => rules.email(v) || "havetoBeValidEmail",
    };
  },
});
</script>
