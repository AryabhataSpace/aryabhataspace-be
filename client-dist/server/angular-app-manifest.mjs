
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
    "route": "/verify-email"
  },
  {
    "renderMode": 1,
    "route": "/reset-password"
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
    'index.csr.html': {size: 78116, hash: '9f0faf43301437354c88cb98d23f7a0eb52e7f33261bd3895827d83da5d65d6d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22210, hash: '6bd5bf013d7ef05c6c2108ce4914010e68ac8a5da85e89af9de45a8da356c1a4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 113275, hash: '30c716845edd54baa54a699c06c7aafbc4343019ebfc90cfe32c31580a9087dc', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'privacy/index.html': {size: 113031, hash: 'a1ed0f52230ffc04d2ea4753cd100053741e1aa3c9e5036af782b869954989f3', text: () => import('./assets-chunks/privacy_index_html.mjs').then(m => m.default)},
    'terms/index.html': {size: 113013, hash: '4c8eed72669f83745e36e0ce0319da0b10e73b840937d386d6725b0780ac44fb', text: () => import('./assets-chunks/terms_index_html.mjs').then(m => m.default)},
    'styles-AVX7Y43D.css': {size: 169003, hash: 'ypFk/9PfM0I', text: () => import('./assets-chunks/styles-AVX7Y43D_css.mjs').then(m => m.default)}
  },
};
