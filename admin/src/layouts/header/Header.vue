<template>
    <v-app-bar app clipped-left clipped-right color="white" light>
        <v-toolbar-title class="align-center d-flex">
            <span class="logo-icon">
                <img src="@/assets/logo-32x32.png" />
            </span>
            <span class="logo-text mx-2">
                <div class="text-bold">Jayab</div>
            </span>
        </v-toolbar-title>
        <v-app-bar-nav-icon
            class="d-block d-md-none"
            @click="
                $vuetify.breakpoint.smAndDown
                    ? setSidebarDrawer(!Sidebar_drawer)
                    : $emit('input', !value)
            "
        />
        <v-spacer />
        <!---right part -->
        <v-btn
            v-if="isUserLoggedIn"
            light
            icon
            @click="$router.push({ path: '/views/tickets/index' })"
        >
            <v-badge
                :value="user.unseenTickets"
                left
                dot
                color="red"
            >
                <v-icon>mdi-message</v-icon>
            </v-badge>
        </v-btn>
        <v-menu
            v-if="isUserLoggedIn"
            bottom
            left
            transition="scale-transition"
        >
            <template v-slot:activator="{ on }">
                <v-btn light icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item :to="'/views/pages/profile'">
                    <v-list-item-title>پروفایل</v-list-item-title>
                </v-list-item>
                <v-list-item :to="'/views/pages/setting'">
                    <v-list-item-title>تنظیمات</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item :to="'/views/pages/search'">
          <v-list-item-title>جستجو</v-list-item-title>
        </v-list-item> -->
                <v-list-item @click="logout">
                    <v-list-item-title>خروج</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
    name: "Header",

    components: {},

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isUserLoggedIn: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Object,
        },
    },
    data: () => ({}),

    computed: {
        ...mapState(["Sidebar_drawer"]),
    },

    methods: {
        ...mapMutations({
            setSidebarDrawer: "SET_SIDEBAR_DRAWER",
        }),
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push({
                path: "/login",
            });
        },
    },
};
</script>
