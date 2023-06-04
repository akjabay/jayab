<template>
  <q-card flat tile>
    <div class="">
      <div class="text-center">
        <div class="q-ma-md">
          <q-avatar size="90px" v-if="loadedUser.avatar_url">
            <image-comp :link="loadedUser.avatar_url" :isThumb="true"></image-comp>
          </q-avatar>

          <q-avatar v-else size="90px" color="blue-grey-2">
            <q-icon name="person"></q-icon>
          </q-avatar>
        </div>
        <div class="q-my-sm">
          <div class="text-h5">{{ loadedUser.name || loadedUser.id }}</div>
          <div class="text-normal" style="opacity: 0.8">
            {{ loadedUser.email }}
          </div>
        </div>
        <q-btn size="lg" class="ad-font-color" outline rounded>
          <span>{{ loadedUser.phone }} </span>
            <a class="" :href="`tel:${loadedUser.phone}`">
            <span class="q-px-lg q-py-xs q-mr-lg bg-green" style="border-radius: 25pc; color: white;">
              <q-icon size="sm" class="q-px-sm" name="fa fa-phone" />
            </span>
          </a>
        </q-btn>
        <q-btn
            v-if="isUserLoggedIn && (user.id == loadedUser.id || user.is_superuser == 1)"
            @click="onCopy"
            class="q-ma-xs q-px-md ad-font-color"
            outline
            rounded
          >
            <span class="q-px-xs"><q-icon name="fa fa-copy" /></span>
            {{ $t('copyProfileURL') }}
          </q-btn>
      </div>


      <div
        v-if="isUserLoggedIn && (user.id == loadedUser.id || user.is_superuser == 1)"
        class="q-my-sm text-center"
      >
        <div>
          <q-btn
            :to="'/accounts/profile/setting/' + loadedUser.username"
            class="q-mx-xs q-px-md"
            outline
            rounded
            dense
          >
            {{ $t('accountSettings') }}
          </q-btn>
          <q-btn
            v-if="isRealStateOwner"
            @click="() => $router.push('/accounts/plus')"
            class="q-mx-xs q-px-md"
            outline
            rounded
            dense
          >
            {{ $t("manageStates") }}
          </q-btn>
        </div>
      </div>

      <hr class="line-style-two" style="margin-bottom: 0;" />

      <bar-comp
        :navs="navs"
        :navValue="navValue"
        v-on:nav-change="(i) => (navValue = i)"
      >
      </bar-comp>

      <!-- <submit-request-comp v-if="navValue === 0" ></submit-request-comp> -->
      <div
        v-if="products.length > 0 && navValue === 0"
      >
        <list-comp :items="products"></list-comp>
        <pagination-comp
          v-on:select-page="onChangePage"
          :currentPage="currentPage"
          :pagination="pagination"
        ></pagination-comp>
      </div>
      <div v-else>
        <empty-comp></empty-comp>
      </div>

    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";
import BarComp from '/src/components/common/BarComp.vue';
import ImageComp from "/src/components/common/ImageComp.vue";
// import SubmitRequestComp from "/src/components/user/SubmitRequestComp.vue";
import ListComp from "/src/components/list/ListComp.vue";
import EmptyComp from "/src/components/main/EmptyComp.vue";
import PaginationComp from "/src/components/common/PaginationComp.vue";
import api from "/src/api/index";


export default defineComponent({
  name: "ProfileComp",
  components: {
    ImageComp,
    BarComp,
    // SubmitRequestComp,
    ListComp,
    EmptyComp,
    PaginationComp
  },
  props: {
    loadedUser: Object,
  },

  setup() {
    return {
      navs: ref([
        { item: "املاک", item_icon: "fa fa-building" },
        { item: "ثبت تقاضا", item_icon: "fa fa-paper-plane" },
      ]),
      navValue: ref(0),
      isRealStateOwner: ref(false),
      products: ref([]),
      currentPage: ref(1),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
    };
  },

  methods: {
    onCopy () {
      navigator.clipboard.writeText(window.location.href);
      this.$q.notify({
        type: "positive",
        message: this.$t("success"),
        caption: this.$t("copyProfileURL"),
      });
    },
    async onChangePage(page) {
      await this.fetchData({ page });
      this.currentPage = page;
    },
    async fetchData (args = []) {
      try {
        const { page } = args;
        if (page) {
          this.pagination.offset = (page - 1) * this.pagination.limit;
        }
        const username = this.$route.params.userId;
        if (username === this.user.username) {
          
          const result = await api.product.productFindMyProducts({
            limit: this.pagination.limit,
            offset: this.pagination.offset,
            sorting: 'cteaedAt: -1',
          });
  
          if (result.status === 200) {
            const products = result.data.data.productFindMyProducts.hits;
            this.products = products;
            this.pagination = result.data.data.productFindMyProducts.pagination;
          }

        } else {

          const result = await api.product.productFindUserProducts({
            userId: this.user.id,
            limit: this.pagination.limit,
            offset: this.pagination.offset,
            sorting: 'cteaedAt: -1',
          });
  
          if (result.status === 200) {
            const products = result.data.data.productFindUserProducts.hits;
            this.products = products;
            this.pagination = result.data.data.productFindUserProducts.pagination;
          }
        }

        this.loaded = true;

      } catch (error) {
        console.log(error);
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
    if (this.user && this.user.permissions) {
      this.isRealStateOwner = this.user.permissions.find((p) => p.codename === 'write product');
    }
  },
  computed: {
    ...mapState(useAuthStore, ["isUserLoggedIn", "user"]),
  },
});
</script>
