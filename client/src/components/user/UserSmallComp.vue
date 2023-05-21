<template>
  <div v-if="user" class="">
    <div @click="$router.push('/accounts/profile/' + user.id)">
      <span class="pointer text-center">
        <q-avatar size="50px" v-if="user.avatar_url">
          <image-comp :link="user.avatar_url" size="50px" :isThumb="true"></image-comp>
        </q-avatar>

        <q-avatar v-else color="white">
          <q-icon size="sm" name="fa-regular fa-user"></q-icon>
        </q-avatar>
      </span>

      <span class="pointer q-mt-md q-mx-xs font-weight-light">
        <span>{{ user.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ImageComp from "/src/components/common/ImageComp.vue";

export default defineComponent({
  name: "UserSmallComp",

  components: {
    ImageComp,
  },
  props: {
    user: {
      type: Object,
    },
  },
  setup: () => ({}),
});
</script>
