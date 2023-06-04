<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TableSimpleFixHeader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-right">ردیف</th>
                          <th class="text-right">نام کاربری</th>
                          <th class="text-right">ایمیل یا تلفن</th>
                          <th class="text-right">وضعیت</th>
                          <th class="text-right">تاریخ عضویت</th>
                          <th class="text-center">مشاهده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in users" :key="i">
                        <td>{{ (page - 1) * 10 + i+1 }}</td>
                        <td>
                          <span>{{ item.username }}</span>
                        </td>
                        <td>
                          <span>{{ item.email ? item.email: item.phone }}</span>
                        </td>
                        <td>
                          <span>{{ item.status_auth }}</span>
                        </td>
                        <td>
                          <span>{{ Math.ceil(Number(item.createdAt ) / 1000) | moment("jYYYY-jMM-jDD HH:MM") }}</span>
                        </td>
                        <td
                          class="text-center"
                        >
                          <v-btn
                            @click="$emit('view-user', item.id)"
                            color="success"
                          >
                            مشاهده
                          </v-btn>  
                        </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  :length="length"
                  total-visible="5"
                  @input="$emit('fetch-users', page)"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TableSimpleFixHeader",

  props: {
    users: Array,
    pagination: Object,
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    length: function () {
      if (this.users[0]) {
        return Math.ceil(parseInt(this.pagination.total)/parseInt(this.pagination.limit))
      } else {
        return 0
      }
    }
  }
};
</script>