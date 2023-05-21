<template>
  <div class="q-py-sm q-mx-sm">
    <div class="col-12 text-center">
      <q-input
        required
        outlined
        class="q-mt-sm text-right"
        v-model="info.name"
        :rules="[rules.required]"
        :label="$t('inputTitle')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        required
        outlined
        class="q-mt-sm text-right"
        v-model="info.address"
        :rules="[rules.required]"
        :label="$t('inputAddress')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        required
        outlined
        class="q-mt-sm text-right"
        v-model="info.area"
        :rules="[rules.required]"
        :label="$t('inputArea')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        outlined
        class="q-mt-sm text-right"
        v-model="info.areaOfBuilding"
        :rules="[]"
        :label="$t('inputAreaOfBuilding')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        outlined
        class="q-mt-sm text-right"
        v-model="info.rooms"
        :rules="[]"
        :label="$t('inputRooms')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        required
        outlined
        class="q-mt-sm text-right"
        v-model="info.price"
        :rules="[rules.required]"
        :label="$t('inputPrice')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        outlined
        class="q-mt-sm text-right"
        v-model="info.pricePerMeter"
        :rules="[]"
        :label="$t('inputPricePerMeter')"
        :style="{ direction: $t('direction') }"
      ></q-input>
      <q-input
        outlined
        class="q-mt-sm text-right"
        v-model="info.details"
        :rules="[]"
        :label="$t('inputDatails')"
        :style="{ direction: $t('direction') }"
      ></q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UserSmallComp",

  components: {},
  props: {
    user: {
      type: Object,
    },
  },
  setup: () => {
    return {
      info: ref({
        pid: "",
        latlng: "",
        name: "",
        address: "",
        area: "",
        pricePerMeter: "",
        areaOfBuilding: "",
        rooms: "",
        details: "",
        category: {},
        price: undefined,
      }),
      filterOptions: ref({}),
      rules: ref({}),
    };
  },
  mounted() {
    this.rules = {
      required: (v) => !!v || this.$t("required"),
      min3: (v) => v.length >= 3 || this.$t("min3Character"),
      min8: (v) => v.length >= 8 || this.$t("min8Character"),
      email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
    };
  },
});
</script>
