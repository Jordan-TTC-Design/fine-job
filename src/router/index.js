import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // ---------- 前台路由 ----------
  {
    path: '/',
    component: () => import('../views/front/Front.vue'),
    children: [
      {
        // 首頁
        path: '',
        component: () => import('../views/Home.vue'),
      },
      {
        // 全部產品頁面
        path: 'products-list',
        component: () => import('../views/front/ProductsList.vue'),
      },
      {
        // 收藏頁面
        path: 'collection',
        component: () => import('../views/front/Collection.vue'),
      },
      {
        // 收藏夾
        path: 'collection-folder/:id',
        component: () => import('../views/front/CollectionFolder.vue'),
      },
      {
        // 獨立產品頁面
        path: 'products-list/product/:id',
        component: () => import('../views/front/Product.vue'),
      },
      {
        // 獨立企業頁面
        path: 'products-list/company/:id',
        component: () => import('../views/front/Company.vue'),
      },
      {
        // 搜尋相關職位
        path: 'search/',
        component: () => import('../views/front/SearchPage.vue'),
      },
      {
        // 申請職位頁面
        path: 'apply-job/:id',
        component: () => import('../views/front/ApplyJob.vue'),
      },
      {
        // 新建企業
        path: 'add-company',
        component: () => import('../views/front/AddCompany.vue'),
      },
      {
        // 新建職位
        path: 'add-job',
        component: () => import('../views/front/AddJob.vue'),
      },
    ],
  },
  // ---------- 後台路由 ----------
  {
    // 登入後台
    path: '/admin/dashboard',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        // 全部產品頁面
        path: 'products-list',
        component: () => import('../views/admin/DashBoardProductsList.vue'),
      },
      {
        // 全部訂單頁面
        path: 'orders-list',
        component: () => import('../views/admin/DashBoardOrdersList.vue'),
      },
      {
        // 全部訂單頁面
        path: 'applies-list',
        component: () => import('../views/admin/DashBoardAppliesList.vue'),
      },
      {
        // 新增企業頁面
        path: 'products-list/edit-job/:id',
        component: () => import('../views/admin/EditJobPage.vue'),
      },
      {
        // 新增企業頁面
        path: 'products-list/edit-company/:id',
        component: () => import('../views/admin/EditCompanyPage.vue'),
      },
    ],
  },
  // ---------- 其他路由 ----------
  {
    // 登入後台
    path: '/admin',
    component: () => import('../views/other/AdminLogin.vue'),
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    component: () => import('../views/other/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
