<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="همه اسلایدها">
                    <slides-tbl
                        v-if="slides.length > 0"
                        :slides="slides"
                        v-on:fetch-slides="fetchData"
                    ></slides-tbl>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "SlidesList",

    components: {
        SlidesTbl: () => import("@/components/sdComponents/SlidesTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        slides: [],
        loaded: false,
    }),
    methods: {
        fetchData: async function () {
            try {
                const result = await api.main.slideFindAll({ });
                const sSlides = result.data.data.slideFindAll;
                this.slides = sSlides;
                this.loaded = true;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted () {
        this.fetchData()
    }
}
</script>
