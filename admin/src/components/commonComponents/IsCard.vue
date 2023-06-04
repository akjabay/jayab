<template>
  <v-card
    dark
    :class="'mx-2 text-center ' + colorClass"
    max-width="344"
    min-width="200"
    :to="routePath"
  >
    <v-card-text>
      <v-icon size="4em">{{ isCardIcon }} </v-icon>
    </v-card-text>
    <v-card-text>
      <span class="text-h5">
        {{ title }}
      </span>
    </v-card-text>    
  </v-card>
</template>

<script>
  export default {
    name: 'IsCard',

    props: {
      title: {
        type: String,
        default: '',
      },
      colorClass: {
        type: String,
        default: 'info',
      },
      isCardIcon: {
        type: String,
        default: 'mdi-menu',
      },
      routePath: {
        type: String,
        default: '/',
      }
    },
    data:  () => ({
        
    }),
    
    methods:{
     
    }
  }
</script>