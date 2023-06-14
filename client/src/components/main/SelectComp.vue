<template>
    <div class="q-pa-md">
      <q-btn
        outline
        no-caps
        class="full-width ad-secondary-btn"
        @click="selectDialog = true"
      >
        <span v-if="item && item.name">
          <q-icon
            class="q-mx-sm"
            size="xs"
            :name="item.icon_url"
          />
          {{ item[$i18n.locale.split("-")[0] + "_name"] }}
          <q-icon class="q-mr-xs" name="check"></q-icon>
        </span>
        <span v-else>
          {{ $t('chooseCategory') }}
          <q-icon class="mr-1" :name="'arrow_' + $t('left')"></q-icon>
        </span>
      </q-btn>
  
      <q-dialog v-model="selectDialog" :style="'direction: ' + $t('direction')">
        <q-card class="q-pa-none q-ma-none" style="min-width: 350px">
          <q-card-section>{{ $t('chooseCategory') }}</q-card-section>
          <q-separator></q-separator>
          <div v-if="secondItems.length == 0">
            <q-scroll-area style="height: 300px">
              <q-list>
                <template
                  v-for="(item, i) in items"
                >
                <q-item
                  v-if="item.parent_id === 'root'"
                  clickable
                  :key="i"
                  class="pointer"
                  @click="onSelectParentItem(item)"
                >
                  <q-item-section avatar>
                    <span>{{ i }}</span>
                  </q-item-section>
                  <q-item-section>
                    <q-icon size="xs" :name="item.icon_url" />
                  </q-item-section>
                  <q-item-section>
                    {{ item[$i18n.locale.split("-")[0] + "_name"] }}
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon :name="'arrow_' + $t('left')"></q-icon>
                  </q-item-section>
                </q-item>
              </template>
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
                <q-icon
                  size="xs"
                  :name="secondItems[0].icon_url"
                />
              </span>
              <span class="q-px-md text-bold">
                {{
                  secondItems[0].parent[$i18n.locale.split("-")[0] + "_name"]
                }}
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
                      <q-icon
                        size="xs"
                        :name="item.icon_url"
                      />
                    </span>
                  </q-item-section>
                  <q-item-section>
                    {{ item[$i18n.locale.split("-")[0] + "_name"] }}
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
              {{ $t('reset') }}
            </q-btn>
            <q-btn flat @click="selectDialog = false">
              {{ $t('cancel') }}
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "SelectComp",
    props: {
      item: {
        type: Object,
        required: false,
      },
      items: {
        type: Array,
        required: false,
        default: ref([])
      },
    },
    setup() {
      return {
        secondItems: ref([]),
        selectDialog: ref(false),
      };
    },
    methods: {
      onSelectParentItem(item) {
        this.secondItems = this.items.filter((cs) => {
          return cs.parent_id === item.name;
        });
        if (this.secondItems.length > 0) {
          this.secondItems[0].parent = item;
        }
      },

      onSelectItem(item) {
        this.$emit("on-select-item", item);
        this.secondItems = [];
        this.selectDialog = false;
      },

      onReset () {
        this.onSelectItem({});
        this.selectDialog = false;
      }
    },
  });
  </script>
  