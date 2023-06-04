<template>
  <q-page>
    <main-title-comp :title="$t('manage')"></main-title-comp>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-4 col-xs-5">
        <q-card
          @click="$router.push('/accounts/plus/manage-list')"
          class="q-mx-sm q-my-xs text-center ad-font-color pointer"
        >
          <q-card-section>
            <q-icon size="lg" name="list" />
          </q-card-section>
          <q-card-section>
            {{ $t("list") }} {{ $t("products") }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-5">
        <q-card
          @click="$router.push('/accounts/plus/manage-map')"
          class="q-mx-sm q-my-xs text-center ad-font-color pointer"
        >
          <q-card-section>
            <q-icon size="lg" name="map" />
          </q-card-section>
          <q-card-section>
            {{ $t("map") }} {{ $t("products") }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-5">
        <q-card
          @click="$router.push('/accounts/plus/manage-map?adding=true')"
          class="q-mx-sm q-my-xs text-center ad-font-color pointer"
        >
          <q-card-section>
            <q-icon size="lg" name="add" />
          </q-card-section>
          <q-card-section>
            {{ $t("add") }} {{ $t("product") }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";

export default defineComponent({
  name: "PlusPage",
  components: {
    MainTitleComp,
  },

  setup() {
    return {
      loadedUser: ref({}),
      loaded: ref(false),
    };
  },

  methods: {},
  mounted() {},
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>
