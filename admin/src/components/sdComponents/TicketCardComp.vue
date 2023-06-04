<template>
    <v-card v-if="ticket" class="pa-2 px-md-2 px-sm-2" outlined>
        <v-card-subtitle>
            <div class="row">
                <UserSmallComponent :user="ticket.userId"></UserSmallComponent>
            </div>
        </v-card-subtitle>
        <v-card-title v-if="!isAnswere">{{ ticket.title }}</v-card-title>
        <v-card-subtitle>
            {{
                Math.ceil(Number(ticket.createdAt) / 1000)
                    | moment("jYYYY-jMM-jDD HH:MM")
            }}
        </v-card-subtitle>
        <v-card-text>
            {{ ticket.description }}
        </v-card-text>
        <v-card-text
            v-if="ticket.files && ticket.files.filter((v) => v.url).length > 0"
        >
            <div class="text-begin pa-2 mb-2">فایل ها</div>
            <v-row>
                <v-col
                    v-for="(file, i) in ticket.files"
                    :key="i"
                    cols="12"
                    xs="6"
                    sm="4"
                    md="3"
                    lg="3"
                >
                    <file-comp style="width: 90px" :file="file"></file-comp>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text
            v-if="
                ticket.images && ticket.images.filter((v) => v.url).length > 0
            "
        >
            <div class="text-begin pa-2 mb-2">تصاویر</div>
            <v-row>
                <v-col
                    v-for="(image, i) in ticket.images"
                    :key="i"
                    cols="12"
                    xs="6"
                    sm="4"
                    md="3"
                    lg="3"
                >
                    <image-comp
                        :link="image.url"
                        :isThumb="true"
                        :isLargable="true"
                        class=""
                        style="width: 90px"
                    ></image-comp>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "TicketCardComp",

    props: {
        ticket: Object,
        isAnswere: Boolean,
    },
    data: () => ({}),
    components: {
        UserSmallComponent: () =>
            import("@/components/sdComponents/UserSmallComponent.vue"),
        ImageComp: () => import("@/components/sdComponents/ImageComp.vue"),
        FileComp: () => import("@/components/sdComponents/FileComp.vue"),
    },
    methods: {},
};
</script>
