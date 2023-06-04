<template>
    <v-container>
        <TicketCardComp :ticket="ticket"></TicketCardComp>

        <div class="text-begin pa-2 mb-2">پاسخ ها</div>
        <div
            class="mt-1 mx-1"
            v-for="(answere, index) in ticket.answereIds"
            :key="index"
        >
            <TicketCardComp :ticket="answere" :isAnswere="true"></TicketCardComp>
        </div>

        <div class="text-begin pa-2 mb-2">افزودن پاسخ</div>

        <v-row justify="center">
            <v-col order="12" cols="12" xs="12" sm="11" md="10" lg="9">
                <v-card class="pa-2 px-md-2 px-sm-2" outlined>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="description"
                                    outlined
                                    rows="4"
                                    counter="300"
                                    label="پاسخ"
                                    :rules="[rules.required]"
                                    required
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input
                                    v-model="files"
                                    chips
                                    outlined
                                    multiple
                                    counter
                                    label="انتخاب فایل یا تصویر"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
            <v-col
                order="12"
                cols="12"
                xs="12"
                sm="11"
                md="10"
                lg="9"
                class="text-center"
            >
                <AlertComponent
                    v-if="alert_msg"
                    :alertMsg="alert_msg"
                    :alertType="alert_type"
                >
                </AlertComponent>
                <v-btn
                    block
                    depressed
                    :loading="loading"
                    :disabled="loading"
                    @click="addTicket"
                    color="primary"
                >
                    افزودن
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from "@/api/index.js";
import { Sticky } from "@/middleware/sticky";

export default {
    directives: {
        Sticky,
    },
    data: () => ({
        ticket: {},
        description: "",
        files: [],
        loading: false,
        alert_msg: "",
        alert_type: "",
        rules: {
            required: (value) => !!value || "فیلد ضروری!",
            min: (v) => v.length >= 8 || "حداقل ۸ کاراکتر!",
            min4: (v) => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
            min11: (v) =>
                v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
            emailMatch: (v) =>
                !v.includes("@") ||
                /\S+@\S+\.\S+/.test(v) ||
                "ایمیل را درست وارد کنید!",
        },
    }),
    components: {
        AlertComponent: () =>
            import("@/components/sdComponents/AlertComponent"),
        TicketCardComp: () =>
            import("@/components/sdComponents/TicketCardComp.vue"),
    },
    methods: {
        fetchData: async function () {
            const ticketId = this.$route.params.ticketId;
            try {
                const result = await api.ticket.ticketFindComplete({
                    id: ticketId,
                });
                const sticket = result.data.data.ticketFind;
                this.ticket = sticket;
            } catch (error) {
                console.log(error, "error on fecth data");
            }
        },
        async addTicket() {
            this.loading = true;
            this.alert_msg = "";
            if (this.description) {
                try {
                    const uploadedFiles =
                        this.files.length > 0
                            ? await this._uploadFiles(this.files)
                            : [];
                    const images = uploadedFiles.filter(
                        (uf) => uf.split("-")[0] == "image"
                    );
                    const res = await api.ticket.ticketCreate({
                        answeringToId: this.ticket.id,
                        title: this.ticket.title,
                        description: this.description,
                        thumbnail: images.length > 0 ? images[0] : "",
                        categoryId: this.ticket.categoryId.id,
                        images: images.join(","),
                        files: uploadedFiles
                            .filter((uf) => uf.split("-")[0] == "file")
                            .join(","),
                    });
                    if (res.data.errors) {
                        this.alert_msg = "خطا در ثبت اطلاعات!";
                        this.alert_type = "error";
                    } else if (res.data.data.ticketCreate.id) {
                        this.fetchData();
                        this.alert_type = "success";
                        this.alert_msg = "پاسخ جدید با موفقیت اضافه شد.";
                    }
                } catch (error) {
                    console.log(error);
                    this.alert_msg = "خطا در ثبت اطلاعات!";
                    this.alert_type = "error";
                }
            } else {
                this.alert_msg = "لطفا همه موارد را به درستی کامل کنید";
                this.alert_type = "error";
            }
            this.loading = false;
        },
        async _uploadFiles(files) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.includes("image")) {
                    formData.append("image", files[i]);
                } else {
                    formData.append("file", files[i]);
                }
            }
            try {
                const res = await api.main.upload({ fd: formData });
                if (res.data.success) {
                    const fileNames = res.data.files.map((f) => f.filename);
                    return fileNames;
                } else {
                    this.alert_msg = "خطا در ارسال فایل ها";
                    this.alert_type = "error";
                }
            } catch (error) {
                console.log(error);
                this.alert_msg = "خطا در ارسال فایل ها";
                this.alert_type = "error";
            }
            this.loading = false;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped></style>
