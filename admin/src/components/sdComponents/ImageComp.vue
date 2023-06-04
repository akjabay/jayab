<template>
    <v-card
        :elevation="1"
        class="text-center"
        :class="isLargable ? 'pointer' : ''"
        @click="isLargable ? (alert = true) : ''"
    >
        <v-img :src="$store.state.auth.baseURL + '/public/w90/' + link" />
        <div class="q-pt-md">
            {{ isBlog ? 'تصویر' + " (" + (index ? index : 1) + ")" : "" }}
        </div>
        <v-dialog v-model="alert">
            <v-card>
                <v-card-text>
                    <div class="text-h6">تصاویر</div>
                </v-card-text>
                <v-img
                    :src="$store.state.auth.baseURL + '/public/' + link"
                />
                <v-card-actions>
                    <v-btn @click="alert = false" text color="primary">باشه</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    name: "ImageComp",
    props: {
        link: String,
        isThumb: Boolean,
        isCard: Boolean,
        isBlog: Boolean,
        fillParent: Boolean,
        isLargable: Boolean,
        index: String,
    },
    data () {
        return {
            alert: false,
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
};
</script>
