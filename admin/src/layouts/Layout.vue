<template>
    <v-app id="inspire">
        <Header
            v-model="expandOnHover"
            :user="$store.state.auth.user ? $store.state.auth.user : {}"
            :isUserLoggedIn="$store.state.auth.isUserLoggedIn"
        ></Header>
        <Sidebar
            v-if="$store.state.auth.isUserLoggedIn"
            :expand-on-hover.sync="expandOnHover"
            :user="$store.state.auth.user"
        ></Sidebar>
        <v-main>
            <v-container class="fill-height" fluid>
                <router-view />
            </v-container>
        </v-main>

        <Footer></Footer>
    </v-app>
</template>

<script>
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { mapState, mapMutations } from "vuex";

export default {
    name: "Layout",

    components: {
        Header,
        Sidebar,
        Footer,
    },

    props: {
        source: String,
    },
    data: () => ({
        expandOnHover: false,
    }),
    computed: {
        ...mapState(["Customizer_drawer"]),
    },

    methods: {
        ...mapMutations({
            setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
        }),
    },

};
</script>
