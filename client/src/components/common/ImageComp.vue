<template>
  <div
    class="text-center"
    :class="isLargable ? 'pointer' : ''"
    @click="isLargable ? (alert = true) : ''"
  >
    <img
      :style="[
        (!fillParent
          ? `max-width: ${getImageMaxWidth($q.screen)}px; ${
              isCard ? 'max-height: 206.68px;' : ''
            }`
          : ''),
          (
            size ? `width: ${size}; height: ${size}` : ''
          )
      ]
      "
      style="border-radius: 5px 5px 0 0;"
      :src="link ? $api.getImageUrl($q.screen, link, isThumb, isCard) : 'no-image.svg'"
    />
    <div class="q-pt-md">
      {{ isBlog ? $t("image") + " (" + (index ? index : 1) + ")" : "" }}
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t("image") }}</div>
        </q-card-section>
        <img
          width="970px"
          :src="link ? $api.getImageUrl($q.screen, link, false, false, true) : 'no-image.svg'"
        />
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ImageComp",
  props: {
    link: String,
    isThumb: Boolean,
    isCard: Boolean,
    isBlog: Boolean,
    fillParent: Boolean,
    isLargable: Boolean,
    size: String,
    index: String,
  },
  setup() {
    return {
      alert: ref(false),
    };
  },
  methods: {
    getImageMaxWidth(screen) {
      const width = !this.isCard
        ? this.isThumb
          ? 90
          : screen.gt.sm
          ? 600
          : 370
        : 370;
      return width;
    },
  },
  mounted () {
  }
});
</script>
