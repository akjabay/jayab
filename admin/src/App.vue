<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <router-view />
  </v-app>

</template>

<script>

export default {
  name: 'App',

  components: {
    
  },
  mounted () {
    if (this.$route.name !== "Login" || this.$route.name !== "Signup" ) {
      this.$store.commit("SET_SIDEBAR_DRAWER", true)
    }
    this.$store.dispatch('auth/tryAutoLogin')
    if (!this.$store.state.auth.isUserLoggedIn) {
      if (this.$route.path !== '/signup' && this.$route.path !== '/login') {
        this.$router.push({
          path: '/login'
        })
      }
    } else {
      this.$store.commit("SET_SIDEBAR_DRAWER", true)
    }
  },

};
</script>

<style>
button,
a {
  letter-spacing: 0px !important;
}
.pointer {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version */
}
.pointer:hover {
  backdrop-filter: brightness(95%);
  filter: brightness(95%);
}
.text-pointer {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version */
}
.text-pointer:hover {
  font-variant-ligatures:historical-ligatures;
  filter: brightness(95%);
}
.nav_active {
  margin-top: -1.5px;
  border-width: 1.5px 0px 0px 0px;
  border-style: solid;
  border-color: #8a8a8a;
}

div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}
div.scrollmenu::-webkit-scrollbar-track
{
  border-radius: 10px;
	background-color: #F5F5F5;
}

div.scrollmenu::-webkit-scrollbar
{
  height: 5px;
	background-color: #F5F5F5;
}

div.scrollmenu::-webkit-scrollbar-thumb
{
  border-radius: 10px;
	background-color: #c2c2c2;
}

div.scrollmenu div.scrollmenutag {
  display: inline-block;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  background-color: white;
  border-radius: 5px;
  width: 110px;
}

div.scrollmenu div.scrollmenutag:hover {
  backdrop-filter: brightness(95%);
  filter: brightness(95%);
}
</style>
