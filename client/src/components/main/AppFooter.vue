<template>
  <div class="q-pt-md q-mt-md">

    <hr class="line-style-two ">
    <div class="">
      <q-img class="q-mx-sm" width="40px" src="icons/favicon-128x128.png" />
    </div>
    <div class="row q-pb-md">
      <div class="col-md-3 col-sm-3 col-xs-3">
        <div class="">
          <q-btn
            flat
            no-caps
            to="/"
            :label="$t('home')"
          />
        </div>
        <div>
          <q-btn
            flat
            no-caps
            to="/items/list"
            :label="$t('products')"
          />
        </div>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3">
        <div>
          <q-btn
            flat
            no-caps
            @click="onScroll({ id: 'aboutUs' })"
            :label="$t('aboutUs')"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-6">
          <div
            class="q-pa-sm q-gutter-sm"
            :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'"
          >
            <q-btn
              round
              type="a"
              target="blank"
              href="https://t.me/jayab"
              icon="telegram"
              style="color: #30a4da"
            />
            <q-btn
              round
              type="a"
              target="blank"
              href="https://instagram.com/jayab"
              icon="fa fa-brands fa-instagram"
              style="color: #f74c04"
            />
          </div>
      </div>
    </div>
    <div class="row q-pa-md" :class="$q.dark.isActive ? '' : 'bg-grey-3'">
        <div class="col-7 q-pt-sm text-bold">
          {{ $t("copyRight") }} - {{ new Date().getFullYear() }}
        </div>
        <div
          class="col-5"
          :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
        >
          <div class="q-pt-sm">Built By AraTech Group</div>
        </div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppFooter",
  components: {},
  setup () {
    return {};
  },
  methods: {
    onScroll(args = []) {
      const { id } = args;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        this.$router.push("/");
      }
    },
    onOpenUrl(url) {
      window.open(url, "_blank");
    },
  },
  mounted() {},
});
</script>
