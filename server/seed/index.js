const db = require('../models/index');
const bcrypt = require("bcrypt");

const permissions = [

    { _id: "6469e9d6c690c000825b94ba", codename: 'write user', persian_codename: 'افزودن کاربر' },
    { _id: "6469e9d6c690c000825b92b0", codename: 'read user', persian_codename: 'خواندن کاربر' },
    { _id: "6469e9d6c690c000825b95ba", codename: 'write product', persian_codename: 'افزودن محصول' },
    { _id: "6469e9d6c690c000825b92b2", codename: 'read product', persian_codename: 'خواندن محصول' },
    { _id: "6469e9d6c690c000825b96ba", codename: 'write post', persian_codename: 'افزودن پست' },
    { _id: "6469e9d6c690c000825b92b4", codename: 'read post', persian_codename: 'خواندن پست' },
    { _id: "6469e9d6c690c000825b97ba", codename: 'write ticket', persian_codename: 'افزودن پرسش' },
    { _id: "6469e9d6c690c000825b92b6", codename: 'read ticket', persian_codename: 'خواندن پرسش' },
    { _id: "6469e9d6c690c000825b98ba", codename: 'write slide', persian_codename: 'افزودن اسلاید' },
    { _id: "6469e9d6c690c000825b92b8", codename: 'read slide', persian_codename: 'خواندن اسلاید' },
    { _id: "6469e9d6c690c000825b93ba", codename: 'write category', persian_codename: 'افزودن دسته بندی' },
    { _id: "6469e9d6c690c000825b92ba", codename: 'read category', persian_codename: 'خواندن دسته بندی' },
    { _id: "6469e9d6c690c000825b92bb", codename: 'write comment', persian_codename: 'افزودن نظر' },
    { _id: "6469e9d6c690c000825b92bc", codename: 'read comment', persian_codename: 'خواندن نظر' },
    { _id: "6469e9d6c690c000825b92bd", codename: 'read report', persian_codename: 'گزارش ها' },

];

const categories = [
    {
        _id: "6481a3d7b5563706039ad7e6",
        parent_id: null,
        name: "root",
        fa_name: "دسته بندی اصلی",
        en_name: "root",
        icon_url: "mdi-home-circle-outline",
        icon_url_fa: null,
        full_fa_name: ""
    },
    // {
    //     _id: "64662f14e3b9db8deea7310a",
    //     parent_id: "root",
    //     name: "product",
    //     fa_name: "محصولات",
    //     en_name: "Product",
    //     icon_url: "mdi-cube",
    //     icon_url_fa: "fa-water",
    //     full_fa_name: ""
    // },
    {
        _id: "6481a3d7b5563706039ad7e7",
        parent_id: "root",
        name: "real-estate",
        en_name: "real estate",
        fa_name: "املاک",
        icon_url: "fa fa-home",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7e8",
        parent_id: "real-estate",
        name: "residential-rent",
        en_name: "residential rent",
        fa_name: "اجاره مسکونی",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7e9",
        parent_id: "real-estate",
        name: "residential-sell",
        en_name: "residential sell",
        fa_name: "فروش مسکونی",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7ea",
        parent_id: "real-estate",
        name: "commercial-sell",
        en_name: "commercial sell",
        fa_name: "فروش اداری و تجاری",
        icon_url: "fa fa-house-circle-check",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7eb",
        parent_id: "real-estate",
        name: "partnership",
        en_name: "partnership",
        fa_name: "مشارکت در ساخت",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7ec",
        parent_id: "real-estate",
        name: "presell",
        en_name: "presell",
        fa_name: "پیش فروش",
        icon_url: "fa fa-house-lock",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7ed",
        parent_id: "real-estate",
        name: "commercial-rent",
        en_name: "commercial rent",
        fa_name: "اجاره اداری و تجاری",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7ee",
        parent_id: "real-estate",
        name: "temporary-rent",
        en_name: "temporary rent",
        fa_name: "اجاره کوتاه مدت",
        icon_url: "fa fa-key",
        full_fa_name: ""
    },
    {
        _id: "6481a3d7b5563706039ad7ef",
        parent_id: "real-estate",
        name: "real-estate",
        en_name: "real estate",
        fa_name: "پروژه های ساخت و ساز",
        icon_url: "fa fa-key",
        full_fa_name: ""
    }
]

const services = [
    {
        _id: "646b84fef37028cf327a458b",
        codename : 'plus',
        persian_codename : 'پلاس',
        accesses: 'write product',
        persian_accesses: 'جستجو,مدیریت,داشبورد',
    }
];

const plans = [
    {
        _id: "646b2ea42a5a12ef997229a1",
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
    },
    {
        _id: "646b2ea42a5a12ef997229a2",
        name: 'اشتراک نقره ای',
        description: 'فعال سازی نقره ای سرویس',
        featureDescriptions: 'فعال سازی نقره ای سرویس',
        tags: 'نقره ای',
        position: 1,
        isAvailable: true,
        allowMultiple: false,
        price: {
            month: 0,
            quarter: 3 * 0 * 0.9,
            year:  12 * 0 * 0.8,
            once: 1,
            currency: 'toman'
        },
        trialDays: 30,
        metadata: {},
    },
];

const users = [
    {
        name: 'asm',
        phone: 'OTkwZTQ1MGNhN2JkMDdiNjJiN2EyMjUzNGRiNjUyNjU=',
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
        await db["Permission"].deleteMany();
        await db["Permission"].insertMany(permissions);
    }
    if (dbUsers.length === 0) {
        const dbPermissions = await db["Permission"].find();
        users.forEach((u) => {
            u.password = bcrypt.hashSync(u.password, bcrypt.genSaltSync(10));
            u.permissions = dbPermissions.map((p) => p.id);
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