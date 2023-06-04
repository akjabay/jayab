<template>
    <div v-if="user" class="text-pointer text-center" @click="$router.push('/views/users/edit/' + user.id)">

        <span class="">
          <v-avatar size="30" v-if="user.avatar_url">
            <img
              :src="
                this.$store.state.auth.baseURL +
                '/public/w90/' +
                user.avatar_url
              "
              :alt="user.name"
            />
          </v-avatar>

          <v-avatar v-else size="30" color="white">
            <v-icon size="30"> mdi-account-circle </v-icon>
          </v-avatar>
        </span>
      
        <span class="font-weight-light mr-1">
          <span>{{ user.name }}</span>
        </span>

    </div>
</template>

<script>
  export default {
    name: 'UserSmallComponent',

    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data: () => ({
    }),
  }
</script>
