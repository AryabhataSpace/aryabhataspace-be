
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/login"
  },
  {
    "renderMode": 1,
    "route": "/register"
  },
  {
    "renderMode": 0,
    "route": "/forgot-password"
  },
  {
    "renderMode": 1,
    "redirectTo": "/admin/dashboard",
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "route": "/admin/login"
  },
  {
    "renderMode": 1,
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 1,
    "route": "/admin/posts"
  },
  {
    "renderMode": 1,
    "route": "/admin/posts/new"
  },
  {
    "renderMode": 1,
    "route": "/admin/posts/*/edit"
  },
  {
    "renderMode": 1,
    "route": "/admin/pages"
  },
  {
    "renderMode": 1,
    "route": "/admin/pages/*"
  },
  {
    "renderMode": 1,
    "route": "/admin/projects"
  },
  {
    "renderMode": 1,
    "redirectTo": "/admin/dashboard",
    "route": "/admin/navigation"
  },
  {
    "renderMode": 1,
    "redirectTo": "/admin/dashboard",
    "route": "/admin/site-settings"
  },
  {
    "renderMode": 1,
    "route": "/admin/membership-applications"
  },
  {
    "renderMode": 1,
    "route": "/admin/audit-logs"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/privacy"
  },
  {
    "renderMode": 2,
    "route": "/terms"
  },
  {
    "renderMode": 0,
    "route": "/partners"
  },
  {
    "renderMode": 0,
    "route": "/faq"
  },
  {
    "renderMode": 0,
    "route": "/contact"
  },
  {
    "renderMode": 0,
    "route": "/projects"
  },
  {
    "renderMode": 0,
    "route": "/projects/*"
  },
  {
    "renderMode": 0,
    "route": "/posts"
  },
  {
    "renderMode": 0,
    "route": "/news"
  },
  {
    "renderMode": 0,
    "route": "/join"
  },
  {
    "renderMode": 1,
    "route": "/dashboard"
  },
  {
    "renderMode": 1,
    "route": "/dashboard/posts"
  },
  {
    "renderMode": 1,
    "route": "/dashboard/projects"
  },
  {
    "renderMode": 1,
    "route": "/dashboard/projects/*"
  },
  {
    "renderMode": 1,
    "route": "/profile"
  },
  {
    "renderMode": 1,
    "route": "/applications"
  },
  {
    "renderMode": 0,
    "route": "/vault"
  },
  {
    "renderMode": 0,
    "redirectTo": "/profile",
    "route": "/settings"
  },
  {
    "renderMode": 0,
    "route": "/**"
  },
  {
    "renderMode": 0,
    "route": "/**/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 78116, hash: '15a039b58e2cb88f07318b679d3baa4ba5e950ad77ec45e222b818bb7376522a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22210, hash: 'ebe9f5910617146694b7746dbfa5280179352fb68b0a26a455986d8bc2e87109', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 103518, hash: '5e2e288932d9b1df63041f6613813973da0dcafd8fa4e6ff4b5c85869e67906f', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'terms/index.html': {size: 103255, hash: '0f2b5803964f29d6c9f670184c33f5273a7f56182ae1349f4fc81965cf3cb33a', text: () => import('./assets-chunks/terms_index_html.mjs').then(m => m.default)},
    'privacy/index.html': {size: 103273, hash: '250f4539af86c6d1d3faa3e3aa68266f3892182f704957a17ebcdad1aa9b6a5d', text: () => import('./assets-chunks/privacy_index_html.mjs').then(m => m.default)},
    'styles-2JKOQ5OZ.css': {size: 151573, hash: '2Xuz9nGs8dM', text: () => import('./assets-chunks/styles-2JKOQ5OZ_css.mjs').then(m => m.default)}
  },
};
