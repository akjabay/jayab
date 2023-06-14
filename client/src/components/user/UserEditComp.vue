<template>
  <div class="row q-mt-xl">
    <div class="col-12 col-md-10 col-sm-10 text-center">

      <div class="row justify-center">
        <image-uploader-comp
          v-if="imageBoxs.length > 0"
          :fetchedImage="imageBoxs[0]"
          :circleBorder="true"
          :boxLength="1"
          v-on:image-inputs="(val) => images = [val]"
          v-on:remove-image-input="() => images = []"
          v-on:delete-image-box="
            () => (imageBoxs = [])
          "
          imageIdx="1"
        >
        </image-uploader-comp>
        <q-card
          v-else
          flat
          style="width: 100px"
          class="q-ma-xs q-py-md q-px-sm text-center"
        >
          <div class="row text-center">
            <q-btn
              class="text-center"
              round
              size="xl"
              @click="
                imageBoxs.push(`${Math.floor(Math.random() * 1000000)}`)
              "
            >
              <q-icon name="mdi-plus"></q-icon>
            </q-btn>
          </div>
        </q-card>

      </div>
      <div class="q-ma-md">{{ editingUser.name }}</div>

      <div
        class="full-width"
        :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'"
      >
        <q-btn
          :loading="loading"
          outline
          @click="onEdit"
          class="q-mt-sm q-mx-sm ad-font-color"
        >
          {{ $t("submitChanges") }}
        </q-btn>
      </div>

      <q-separator class="q-my-md" />
    </div>


    <div class="col-12 col-md-10 col-sm-10 text-center">
      <div class="row q-py-sm q-mx-sm">
        <div class="col-12 col-md-6 col-sm-6 col-xs-10 q-px-md text-center">
          <q-input
            outlined
            dense
            class="q-mt-sm"
            v-model="editingUser.name"
            :rules="[rules.min3]"
            :label="$t('inputName')"
          ></q-input>
        </div>
        <div class="col-12 col-md-6 col-sm-6 col-xs-10 q-px-md text-center">
          <q-input
            outlined
            dense
            class="q-mt-sm"
            v-model="editingUser.username"
            :rules="[rules.min3]"
            :label="$t('inputUsername')"
          >
          <template v-slot:hint>
            {{ editingUser.usernameHint }}
          </template>
        </q-input>
        </div>
        <div class="col-12 col-md-6 col-sm-6 col-xs-10 q-px-md text-center">
          <q-input
            outlined
            dense
            class="q-mt-sm"
            v-model="editingUser.address"
            :rules="[rules.min8]"
            :label="$t('address')"
          ></q-input>
        </div>

        <div class="col-12 col-md-6 col-sm-10 col-xs-10">
          <city-comp
            :items="provinces"
            :item="city"
            v-on:on-select-item="onSelectCity"
          ></city-comp>
        </div>

      </div>
      <div
        class="full-width"
        :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'"
      >
        <q-btn
          :loading="loading"
          outline
          @click="onEdit"
          class="q-mt-sm q-mx-sm ad-font-color"
        >
          {{ $t("submitChanges") }}
        </q-btn>
      </div>

      <q-separator class="q-my-md" />
    </div>

    <!-- <div class="col-12 col-md-10 col-sm-10">
      <sub-title-comp :title="$t('commissions')"></sub-title-comp>

      <div class="row q-my-md">
        <div class="col-12 col-md-6 col-sm-6 col-xs-10 q-px-md">
          <q-input
            outlined
            dense
            type="Number"
            class="q-mt-sm"
            v-model="editingUser.commissionPercentage"
            :rules="[]"
            :label="$t('commissionPercentage')"
          ></q-input>
          <q-input
            outlined
            dense
            type="Number"
            class="q-mt-sm"
            v-model="editingUser.commissionLimit"
            :rules="[]"
            :label="$t('commissionLimit')"
          ></q-input>
          <q-input
            outlined
            dense
            type="Date"
            class="q-mt-sm"
            v-model="editingUser.commissionExpire"
            :rules="[]"
            :label="$t('commissionLimit')"
          ></q-input>
        </div>
      </div>
      <div
        class="full-width"
        :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'"
      >
        <q-btn
          :loading="loading"
          outline
          @click="onEdit"
          class="q-mt-sm q-mx-sm ad-font-color"
        >
          {{ $t("submitChanges") }}
        </q-btn>
      </div>

      <q-separator class="q-my-md" />

    </div> -->

    <div class="col-12 col-md-10 col-sm-10">
      <sub-title-comp :title="$t('changePassword')"></sub-title-comp>
      <q-btn-dropdown
        no-caps
        depressed
        class="ad-primary-btn q-ma-md"
        unelevated=""
        @click="editPassBox = !editPassBox"
        :label="$t('changePassword')"
      ></q-btn-dropdown>
      <div class="row">
        <q-slide-transition>
          <div
            v-show="editPassBox"
            class="col-12 col-md-8 col-sm-8 col-xs-8 q-px-md q-mx-md"
          >
            <q-input
              outlined
              dense
              class="q-mt-sm"
              v-model="editingUser.password"
              :rules="[rules.min8]"
              type="password"
              :label="$t('inputPassword')"
            ></q-input>
            <q-input
              outlined
              dense
              class="q-mt-sm"
              v-model="editingUser.confirmPassword"
              :rules="[rules.min8]"
              type="password"
              :label="$t('inputConfirmPassword')"
            ></q-input>
          </div>
        </q-slide-transition>
        <div
          class="full-width"
          :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'"
        >
          <q-btn
            :loading="loading"
            outline
            @click="onEdit"
            class="q-mt-sm q-mx-sm ad-font-color"
          >
            {{ $t("submitChanges") }}
          </q-btn>
        </div>
      </div>

      <q-separator class="q-my-md" />

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapActions, mapState } from "pinia";
import api from "/src/api/index";
import SubTitleComp from "/src/components/main/SubTitleComp.vue";
import CityComp from '/src/components/main/CityComp.vue';
import ImageUploaderComp from "/src/components/main/ImageUploaderComp.vue";


export default defineComponent({
  name: "UserEditComp",
  components: { SubTitleComp, CityComp, ImageUploaderComp },

  setup() {
    return {
      editingUser: ref({
        name: "",
        username: "",
        usernameHint: "",
        address: "",
        commissionPercentage: "",
        commissionLimit: "",
        commissionExpire: "",
        password: "",
        confirmPassword: "",
        city: {}
      }),
      images: ref([]),
      imageBoxs: ref([]),
      city: ref({}),
      provinces: ref([]),
      rules: ref({}),
      editPassBox: ref(false),
      loading: ref(false),
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  watch: {
    'editingUser.username': function () {
      this.checkUsername();
    }
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser", "setToken"]),

    onSelectCity (v) {
        this.city = v;
        this.editingUser.city = this.city;
      },

    async onEdit() {
      this.loading = true;
      try {
        if (
          (this.editingUser.password && this.editingUser.confirmPassword) &&
          this.editingUser.password !== this.editingUser.confirmPassword
        ) {
          this.loading = false;
          return this.$q.notify({
            type: "negative",
            message: this.$t("passwordIsNotMatch"),
            caption: this.$t("failed"),
          });
        }
        const result = await api.auth.authUpdate({
          avatar_url: this.images && this.images.length > 0 ? this.images[0] : '',
          name: this.editingUser.name,
          username: this.editingUser.username,
          address: this.editingUser.address,
          cityId: this.editingUser.city ? this.editingUser.city.id : '',
          commissionPercentage: this.editingUser.commissionPercentage,
          commissionLimit: this.editingUser.commissionLimit,
          commissionExpire: this.editingUser.commissionExpire,
          password: this.editingUser.password,
        });
        if (result.data.errors) {
          this.loading = false;
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        } else if (result.data.data.authUpdate.id) {
          this.editingUser = result.data.data.authUpdate;
          this.setUser(this.editingUser);
          this.$q.notify({
            type: "positive",
            message: this.$t("success"),
            caption: this.$t("success"),
          });
          this.loading = false;
        } else {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        }
      } catch (error) {
        console.log(error, "error on fecth data");
        this.loading = false;
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
      this.loading = false;
    },
    checkUsername: async function () {
      try {
        this.editingUser.usernameHint = "";
        const result = await api.auth.authCheckUsername({ username: this.editingUser.username });
        if (result.data.errors) {
          this.$q.notify({
            type: "negative",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        } else if (result.data.data.authCheckUsername === true) {
          this.editingUser.usernameHint = "نام کاربری تکراری است";
        } else if (result.data.data.authCheckUsername === false) {
          this.editingUser.usernameHint = "نام کاربری مورد تایید است";
        }
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
    async fetchData() {
      try {
        // const id = this.$route.params.userId;
        const result = await api.auth.authFindMe();
        if (result.data.errors) {
          this.$q.notify({
            type: "warning",
            message: this.$t("failed"),
            caption: result.data.errors[0],
          });
        } else if (result.data.data.authFindMe) {
          this.editingUser = result.data.data.authFindMe;
          if (this.editingUser.avatar_url) {
            this.imageBoxs.push(this.editingUser.avatar_url);
          }
          this.city = this.editingUser.city ? this.editingUser.city : {};
        }

        const _result = await api.main.getProvinces();
        if (_result.status === 200) {
          const provinces = _result.data.data;
          this.provinces = provinces;
        }
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
    this.rules = {
      required: (v) => !!v || this.$t("required"),
      min3: (v) => !v || v.length >= 3 || this.$t("min3Character"),
      min8: (v) => !v || v.length >= 8 || this.$t("min8Character"),
      email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
    };
    this.fetchData();
  },
});
</script>
