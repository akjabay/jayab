<template>
  <q-page>
    <main-title-comp :title="$t('subscription')"></main-title-comp>
    <sub-title-comp :title="$t('activate')"></sub-title-comp>

    <q-card v-if="service && service.id" flat class="q-ma-sm ad-box-bordered">
      <q-card-section>
        {{ service.persian_codename }}
      </q-card-section>
      <q-card-section>
        <span
          class="q-mx-sm"
          v-for="(access, j) in service.persian_accesses.split(',')"
          :key="j"
        >
          {{ "✅ " + access }}
        </span>
      </q-card-section>
    </q-card>

    <div class="row justify-center">
      <q-card v-for="(plan, i) in plans" :key="i" flat class="q-ma-sm ad-fixed-card ad-box-bordered">
        <q-card-section>
          <div class="text-bold q-mb-md">
            {{ "🥇 " + plan.name }}
          </div>
          <div>{{ plan.description }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>{{ $t("activate") + " " + $t("monthly") }}</div>
          <q-btn
            @click="onActivate({ service, plan, duration: 'month' })"
            outline
            class="full-width ad-secondary-btn"
            :label="plan.price.month + ' ' + $t(plan.price.currency)"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>{{ $t("activate") + " " + $t("quarterly") }}</div>
          <div class="text-center q-ma-sm">
            <span style="font-size: 25px;">💥</span>
            {{ plan.price.month ? (((3 * plan.price.month) - plan.price.quarter) / (3 * plan.price.month)) * 100 : 0 }}% {{ $t('discount') }}
            <span style="font-size: 25px;">💥</span>
          </div>
          <q-btn
            @click="onActivate({ service, plan, duration: 'quarter' })"
            outline
            class="full-width ad-secondary-btn"
            :label="plan.price.quarter + ' ' + $t(plan.price.currency)"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>{{ $t("activate") + " " + $t("yearly") }}</div>
          <div class="text-center q-ma-sm">
            <span style="font-size: 25px;">💥</span>
            {{ plan.price.month ? (((12 * plan.price.month) - plan.price.year) / (12 * plan.price.month)) * 100 : 0 }}% {{ $t('discount') }}
            <span style="font-size: 25px;">💥</span>
          </div>
          <q-btn
            @click="onActivate({ service, plan, duration: 'year' })"
            outline
            class="full-width ad-secondary-btn"
            :label="plan.price.year + ' ' + $t(plan.price.currency)"
          />
        </q-card-section>
      </q-card>

      <q-dialog
        v-model="dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        :style="{ direction: $t('direction') === 'rtl' ? 'rtl' : 'ltr' }"
      >
        <q-card class="my-card">
          <q-card-section>
            {{ $t('activate') }}
          </q-card-section>
          <q-card-section>
            {{ activatingInfo.service.persian_codename }}
          </q-card-section>
          <q-card-section>
            <span
              class="q-mx-sm"
              v-for="(access, j) in activatingInfo.service.persian_accesses.split(',')"
              :key="j"
            >
              {{ "✅ " + access }}
            </span>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-bold q-mb-md">
              {{ "🥇 " + activatingInfo.plan.name }}
            </div>
            <div>{{ activatingInfo.plan.description }}</div>
            <div>{{ $t("activate") + " " + $t(activatingInfo.duration + "ly") }}</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            {{ $t('yourOrderHasSubmittedWeWillCallYouSoon') }}
          </q-card-section>
          <q-card-actions
            :align="$t('direction') === 'rtl' ? 'right' : 'left'"
            class="bg-white text-teal"
          >
            <q-btn color="red" flat :label="$t('ok')" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
  name: "SubscriptionActivatePage",
  components: {
    MainTitleComp,
    SubTitleComp,
  },

  setup() {
    return {
      service: ref({}),
      plans: ref([]),
      activatingInfo: ref({}),
      dialog: ref(false),
      disable: ref(false),
      loading: ref(false),
    };
  },

  methods: {
    onActivate: async function (args = []) {
      try {
        const { plan = {}, service = {}, duration } = args;
        this.activatingInfo = {};
        const result = await api.user.userActivateService({ serviceId: service.id, planId: plan._id, duration });

        if (result.data.data.userActivateService) {
          Object.keys(args).forEach((key) => {
            this.activatingInfo[key] = args[key];
          })
          this.dialog = true;
        }

      } catch (error) {
        console.log(error, "error on fecth data");
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }

    },
    fetchData: async function () {
      try {
        const id = this.$route.params.id;
        const result = await api.main.getService({ id });
        this.service = result.data.data.serviceFind;
        const _result = await api.main.getPlans();
        if (_result.data.success) {
          this.plans = _result.data.data;
        }
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
  },
});
</script>
