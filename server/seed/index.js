const db = require('../models/index');
const bcrypt = require("bcrypt");

const permissions = [

    { codename: 'write user', persian_codename: 'افزودن کاربر' },
    { codename: 'read user', persian_codename: 'خواندن کاربر' },
    { codename: 'write product', persian_codename: 'افزودن محصول' },
    { codename: 'read product', persian_codename: 'خواندن محصول' },
    { codename: 'write post', persian_codename: 'افزودن پست' },
    { codename: 'read post', persian_codename: 'خواندن پست' },
    { codename: 'write ticket', persian_codename: 'افزودن پرسش' },
    { codename: 'read ticket', persian_codename: 'خواندن پرسش' },
    { codename: 'write slide', persian_codename: 'افزودن اسلاید' },
    { codename: 'read slide', persian_codename: 'خواندن اسلاید' },
    { codename: 'write category', persian_codename: 'افزودن دسته بندی' },
    { codename: 'read category', persian_codename: 'خواندن دسته بندی' },
    { codename: 'write comment', persian_codename: 'افزودن نظر' },
    { codename: 'read comment', persian_codename: 'خواندن نظر' },
    { codename: 'read report', persian_codename: 'گزارش ها' },

];

const categories = [
    {
        id: "64662f14e3b9db8deea7310b",
        parent_id: null,
        name: "root",
        fa_name: "دسته بندی اصلی",
        en_name: "root",
        icon_url: "mdi-home-circle-outline",
        icon_url_fa: null,
        full_fa_name: ""
    },
    // {
    //     id: "64662f14e3b9db8deea7310a",
    //     parent_id: "root",
    //     name: "product",
    //     fa_name: "محصولات",
    //     en_name: "Product",
    //     icon_url: "mdi-cube",
    //     icon_url_fa: "fa-water",
    //     full_fa_name: ""
    // },
    {
        id: "64662f14e3b9db8deea7310c",
        parent_id: "root",
        name: "real-estate",
        en_name: "real estate",
        fa_name: "املاک",
        icon_url: "fa fa-home",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea7310d",
        parent_id: "real-estate",
        name: "residential-rent",
        en_name: "residential rent",
        fa_name: "اجاره مسکونی",
        icon_url: "mdi-home-circle-outline",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea7310e",
        parent_id: "real-estate",
        name: "residential-sell",
        en_name: "residential sell",
        fa_name: "فروش مسکونی",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea7310f",
        parent_id: "real-estate",
        name: "commercial-sell",
        en_name: "commercial sell",
        fa_name: "فروش اداری و تجاری",
        icon_url: "fa fa-house-circle-check",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea73110",
        parent_id: "real-estate",
        name: "partnership",
        en_name: "partnership",
        fa_name: "مشارکت در ساخت",
        icon_url: "fa fa-key-skeleton",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea73111",
        parent_id: "real-estate",
        name: "presell",
        en_name: "presell",
        fa_name: "پیش فروش",
        icon_url: "fa fa-house-lock",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea73112",
        parent_id: "real-estate",
        name: "commercial-rent",
        en_name: "commercial rent",
        fa_name: "اجاره اداری و تجاری",
        icon_url: "mdi-home-circle-outline",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea73113",
        parent_id: "real-estate",
        name: "temporary-rent",
        en_name: "temporary rent",
        fa_name: "اجاره کوتاه مدت",
        icon_url: "fa fa-house-person-return",
        full_fa_name: ""
    },
    {
        id: "64662f14e3b9db8deea73114",
        parent_id: "real-estate",
        name: "real-estate",
        en_name: "real estate",
        fa_name: "پروژه های ساخت و ساز",
        icon_url: "fa fa-house-building",
        full_fa_name: ""
    }
]

const services = [
    {
        codename : 'plus',
        persian_codename : 'پلاس',
        accesses: 'search,manage,dashboard',
        persian_accesses: 'جستجو,مدیریت,داشبورد',
    }
];

const plans = [
    {
        name: 'اشتراک طلایی',
        description: 'فعال سازی طلایی سرویس',
        featureDescriptions: 'فعال سازی طلایی سرویس',
        tags: 'طلایی',
        position: 1,
        isAvailable: true,
        allowMultiple: false,
        price: {
            month: 250000,
            quarter: 3 * 250000 * 0.9,
            year:  12 * 250000 * 0.8,
            once: 1,
            currency: 'toman'
        },
        trialDays: 30,
        metadata: {},
    }
];

const users = [
    {
        name: 'asm',
        phone: '00000000000',
        email: 'asemhs@gmail.com',
        password: 'asm1470',
        username: 'asm',
        status_auth: 'active',
        is_superuser: 1,
    }
];

module.exports.run = async () => {
    const dbUsers = await db["User"].find();
    const dbPermissions = await db["Permission"].find();
    if (dbPermissions.length !== permissions.length) {
        await db["Permission"].insertMany(permissions);
    }
    if (dbUsers.length === 0) {
        const permissions = await db["Permission"].find();
        users.forEach((u) => {
            u.password = bcrypt.hashSync(u.password, bcrypt.genSaltSync(10));
            u.permissions = permissions.map((p) => p.id);
            return u;
        })
        await db["User"].insertMany(users);
    }
    const dbCategories = await db["Category"].find();
    if (dbCategories.length !== categories.length) {
        await db["Category"].deleteMany();
        await db["Category"].insertMany(categories);
    }
    const dbServices = await db["Service"].find();
    if (dbServices.length !== services.length) {
        await db["Service"].deleteMany();
        await db["Service"].insertMany(services);
    }
    const dbPlans = await db["Plan"].find();
    if (dbPlans.length !== plans.length) {
        await db["Plan"].deleteMany();
        await db["Plan"].insertMany(plans);
    }
}