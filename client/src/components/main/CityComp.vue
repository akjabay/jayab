<template>
  <div class="q-pa-md">
    <q-btn
      outline
      no-caps
      class="full-width ad-secondary-btn"
      @click="selectDialog = true"
    >
      <span v-if="item && item.name">
        <q-icon class="q-mx-sm" size="xs" :name="item.icon_url" />
        {{ item.name }}
        <q-icon class="q-mr-xs" name="check"></q-icon>
      </span>
      <span v-else>
        {{ $t("chooseCity") }}
        <q-icon class="mr-1" :name="'arrow_' + $t('left')"></q-icon>
      </span>
    </q-btn>

    <q-dialog v-model="selectDialog" :style="'direction: ' + $t('direction')">
      <q-card class="q-pa-none q-ma-none" style="min-width: 350px">
        <q-card-section>{{ $t("chooseCity") }}</q-card-section>
        <q-separator></q-separator>
        <div v-if="secondItems.length == 0">
          <q-scroll-area style="height: 300px">
            <q-list>
              <q-item
                v-for="(item, i) in items"
                :key="i"
                clickable
                class="pointer"
                @click="onSelectParentItem(item)"
              >
                <q-item-section avatar>
                  <span>{{ i + 1 }}</span>
                </q-item-section>
                <q-item-section>
                  <q-icon size="xs" :name="item.icon_url" />
                </q-item-section>
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section avatar>
                  <q-icon :name="'arrow_' + $t('left')"></q-icon>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div v-else>
          <div class="q-my-sm">
            <q-btn
              flat
              class="ad-secondary-btn text-center"
              @click="secondItems = []"
            >
              <q-icon :name="'arrow_' + $t('right')"></q-icon>
            </q-btn>
            <span class="q-px-xs">
              <q-icon size="xs" :name="secondItems[0].icon_url" />
            </span>
            <span class="q-px-md text-bold">
              {{ secondItems[0].parent.name }}
            </span>
          </div>
          <q-scroll-area style="height: 300px">
            <q-list>
              <q-item
                clickable
                v-for="(item, i) in secondItems"
                :key="i"
                class="pointer"
                @click="onSelectItem(item)"
              >
                <q-item-section avatar>
                  <span>{{ i + 1 }}</span>
                </q-item-section>
                <q-item-section avatar>
                  <span class="q-px-xs">
                    <q-icon size="xs" :name="item.icon_url" />
                  </span>
                </q-item-section>
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section avatar>
                  <q-icon :name="'arrow_' + $t('left')"></q-icon>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <q-separator></q-separator>
        <q-card-actions>
          <q-space></q-space>
          <q-btn flat color="red" @click="onReset">
            {{ $t("reset") }}
          </q-btn>
          <q-btn flat @click="selectDialog = false">
            {{ $t("cancel") }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/src/api/index";

export default defineComponent({
  name: "CityComp",
  props: {
    item: {
      type: Object,
      required: false,
    },
    items: {
      type: Array,
      required: false,
      default: ref([]),
    },
  },
  setup() {
    return {
      secondItems: ref([]),
      selectDialog: ref(false),
    };
  },
  methods: {
    async onSelectParentItem(item) {

      try {
        const result = await api.main.getCities({
          province_id: item.id,
        });
        if (result.status === 200) {
          const provinces = result.data.data;
          this.secondItems = provinces;

          if (this.secondItems.length > 0) {
            this.secondItems[0].parent = item;
          }
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },

    onSelectItem(item) {
      this.$emit("on-select-item", item);
      this.secondItems = [];
      this.selectDialog = false;
    },

    onReset() {
      this.onSelectItem({});
      this.selectDialog = false;
    },
  },
});
</script>
