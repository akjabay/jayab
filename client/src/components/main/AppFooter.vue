<template>
  <div>
    <div class="row q-py-md q-mt-md">
      <div class="col-md-6 col-sm-6 col-xs-6">
        <div class="text-h6 q-pa-md">Built By AraTech Group</div>
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
              href="https://t.me/botradegroup"
              icon="telegram"
              style="color: #30a4da"
            />
            <q-btn
              round
              type="a"
              target="blank"
              href="https://instagram.com/botradegroup"
              icon="play_circle"
              style="color: #f74c04"
            />
          </div>
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
  methods: {},
  mounted() {},
});
</script>
