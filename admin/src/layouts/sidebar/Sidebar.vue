<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'dark'"
    :color="SidebarColor"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    app
    id="main-sidebar"
  >
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item v-if="user" to="/views/pages/profile" two-line class="px-0">
        <v-list-item-avatar>
          <img
            v-if="user && user.avatar_url"
            :src="$store.state.auth.baseURL + '/public/w90/' + user.avatar_url"
            :alt="user.username"
            class="purple white--text"
          />
          <v-icon
            v-else
            class="white purple--text"
          >
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <!---Sidebar Items -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :active-class="`primary--text`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
    }
  },
  data: () => ({
    items: [
      {
        title: "خانه",
        icon: "mdi-view-dashboard",
        to: "/views/dashboard/index",
      },

      {
        title: "کاربران",
        icon: "mdi-account",
        to: "/views/users/index",
      },

      {
        title: "پست ها",
        icon: "mdi-view-list",
        to: "/views/posts/index",
      },

      {
        title: "محصولات",
        icon: "mdi-view-quilt",
        to: "/views/products/index",
      },

      {
        title: "دسته بندی ها",
        icon: "mdi-checkbox-multiple-marked-outline",
        to: "/views/categories/index",
      },

      {
        title: "نظرات",
        icon: "mdi-comment-outline",
        to: "/views/comments/index",
      },

      {
        title: "تنظیمات",
        icon: "mdi-code-array",
        to: "/views/pages/setting",
      },

      // {
      //   title: "سفارشات",
      //   icon: "mdi-format-list-bulleted",
      //   to: "/views/orders/index",
      // },
    ],
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {},
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    min-height: 35px;
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
  .v-list-item__icon i {
    width: 20px;
  }
  .icon-size .v-list-group__items i {
    width: 16px;
    font-size: 16px;
  }
  .profile-bg {
    &.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      opacity: 1;
    }
    .v-avatar {
      padding: 15px 0;
    }
  }
  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}

.theme--dark.v-navigation-drawer {
  background-color: #242a33 !important;
}
</style>