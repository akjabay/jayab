import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./store/index";
const Store = store();

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        component: () => import('@/layouts/Layout'),
        children: [
            // Components
            {
                name: 'Login',
                path: '/login',
                component: () => import('@/views/auth/Login'),
                meta: {
                    authNotRequired: true
                }
            },

        ],
    },

    {
        path: '/views/dashboard',
        component: () => import('@/layouts/Layout'),
        children: [
            // Components
            {
                name: 'Dashboard',
                path: 'index',
                component: () => import('@/views/dashboard/BasicDashboard'),
            },

        ]
    },

    {
        path: '/views/users',
        component: () => import('@/layouts/Layout'),
        children: [
            {
                name: 'Users',
                path: 'index',
                component: () => import('@/views/pages/users/Users'),
            },

            {
                name: 'UsersList',
                path: 'list',
                component: () => import('@/views/pages/users/UsersList'),
            },

            {
                name: 'UsersListStatus',
                path: 'list/:status_auth',
                component: () => import('@/views/pages/users/UsersList'),
            },

            {
                name: 'UserAdd',
                path: 'add',
                component: () => import('@/views/pages/users/UserAdd'),
            },

            {
                name: 'UserEdit',
                path: 'edit/:userId',
                component: () => import('@/views/pages/users/UserEdit'),
                props: true,
            },

            {
                name: 'Search',
                path: 'search',
                component: () => import('@/views/pages/users/Search'),
            },

        ]
    },

    {
        path: '/views/products',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Products',
                path: 'index',
                component: () => import('@/views/pages/products/Products'),
            },

            {
                name: 'ProductsList',
                path: 'list',
                component: () => import('@/views/pages/products/ProductsList'),
            },

            {
                name: 'ProductsListVisibility',
                path: 'list/:visibility',
                component: () => import('@/views/pages/products/ProductsList'),
            },

            {
                name: 'ProductAdd',
                path: 'add',
                component: () => import('@/views/pages/products/ProductAdd'),
            },

            {
                name: 'ProductEdit',
                path: 'edit/:productId',
                component: () => import('@/views/pages/products/ProductEdit'),
                props: true,
            },

        ]
    },

    {
        path: '/views/posts',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Posts',
                path: 'index',
                component: () => import('@/views/pages/posts/Posts'),
            },

            {
                name: 'PostsList',
                path: 'list',
                component: () => import('@/views/pages/posts/PostsList'),
            },

            {
                name: 'PostsListVisibility',
                path: 'list/:visibility',
                component: () => import('@/views/pages/posts/PostsList'),
            },

            {
                name: 'PostAdd',
                path: 'add',
                component: () => import('@/views/pages/posts/PostAdd'),
            },

            {
                name: 'PostEdit',
                path: 'edit/:postId',
                component: () => import('@/views/pages/posts/PostEdit'),
                props: true,
            },

        ]
    },

    {
        path: '/views/orders',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Orders',
                path: 'index',
                component: () => import('@/views/pages/orders/Orders'),
            },

            {
                name: 'OrderEdit',
                path: 'edit/:orderId',
                component: () => import('@/views/pages/orders/OrderEdit'),
                props: true,
            },

        ]
    },

    {
        path: '/views/tickets',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Tickets',
                path: 'index',
                component: () => import('@/views/pages/tickets/Tickets'),
            },
            {
                name: 'View',
                path: 'view/:ticketId',
                component: () => import('@/views/pages/tickets/TicketView'),
            },

        ]
    },

    {
        path: '/views/categories',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Categories',
                path: 'index',
                component: () => import('@/views/pages/categories/Categories'),
            },

            {
                name: 'CategoriesList',
                path: 'list',
                component: () => import('@/views/pages/categories/CategoriesList'),
            },

            {
                name: 'CategoriesAdd',
                path: 'add',
                component: () => import('@/views/pages/categories/CategoriesAdd'),
            },

        ]
    },

    {
        path: '/views/comments',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Comments',
                path: 'index',
                component: () => import('@/views/pages/comments/Comments'),
            },

        ]
    },

        
    {
        path: '/views/slides',
        component: () => import('@/layouts/Layout'),
        children: [
            {
                name: 'SlidesList',
                path: 'list',
                component: () => import('@/views/pages/slides/SlidesList'),
            },

            {
                name: 'SlidesAdd',
                path: 'add',
                component: () => import('@/views/pages/slides/SlideAdd'),
            },

        ]
    },

    {
        path: '/views/pages',
        component: () => import('@/layouts/Layout'),
        children: [

            {
                name: 'Profile',
                path: 'profile',
                component: () => import('@/views/pages/Profile'),
            },
            
            {
                name: 'Setting',
                path: 'setting',
                component: () => import('@/views/pages/Setting'),
            },

        ]
    },

]

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    const store = await Store.getters["auth/authGetter"];
    if (
        !store.isUserLoggedIn &&
        !to.meta.authNotRequired
    )
        next({ name: "Login" });
    else next();
});


export default router