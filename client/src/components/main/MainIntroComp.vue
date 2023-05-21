<template>
    <div>
        <div class="row q-py-md justify-center">
          <div class="col text-center q-py-md">
            <!-- <span class="text-h3 text-bold">
              {{ $t('jalaIntro') }}
            </span> -->
            <h2>
              <span class="text-bold">{{ $t('home') }}</span> <br />
              <span class="text-bold ad-font-color">{{ $t('for') }} </span>
              <span class='text-bold random-word q-mx-md ad-font-color'>{{ randomText }}</span>
              <span class="spliting">|</span>
            </h2>
          </div>
        </div>
        <q-separator />
    </div>
</template>


<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainIntroComp",
  props: {
  },
  setup: () => {
    return {
        randomText: ref('')
    }
  },
  methods: {
    randomNum (max) {
        return Math.floor(Math.random() * max)
    },

    async phraseChanger () {
        const phrases = ['همه', 'مردم', 'جوانان', 'دوست', 'همسر', 'خانواده', 'دانشجو'];
        while(true) {
            let newPhrase = phrases[this.randomNum(phrases.length)];
            newPhrase = newPhrase === this.randomText ? phrases[this.randomNum(phrases.length)] : newPhrase;
            this.randomText = '';
            for (const char of newPhrase.split('')) {
                await new Promise(r => setTimeout(r, 100));
                this.randomText = this.randomText + char;
            };
            await new Promise(r => setTimeout(r, newPhrase.length * 500));
        }
    },

    init () {

        this.phraseChanger();

    }
  },
  mounted () {
    this.init()
  }
});
</script>

<style scoped>

.random-word {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 3px;
  width: auto;
/*   transition: all 1.25s; */
  /* animation: slidedown 4s infinite;
  -webkit-animation: slidedown 4s infinite;
  -moz-animation: slidedown 4s infinite; */
}

.spliting {
    animation: split 1.2s infinite;
  -webkit-animation: split 1.2s infinite;
  -moz-animation: split 1.2s infinite;
}

@keyframes split {
  0% {
    opacity: 100;
  }
  
  100% {
    opacity: 0;
  }
}
/* @keyframes slidedown {
  0% {
    opacity: 50;
  }
  
  5% {
    opacity: 0;
    transform: translateY(0.5em);
  }
  
  7% {
    transform: translateY(-1em);
  }
  
  10% {
    opacity: 0;
  }
  
  20% {
    transform: translateY(0);
    opacity: 100;
  }
} */

</style>
