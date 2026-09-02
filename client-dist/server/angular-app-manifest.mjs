
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
    'index.csr.html': {size: 78116, hash: '360070944248e4c2eca6ab7b6a03668ca068ed4f681bd8ae0ceb6299e5705e47', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22210, hash: '93fa9862af25a412cf874df27e0aa6462bfd983a3c8f5f2e09143a6b65145931', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'privacy/index.html': {size: 113031, hash: '8d8b7a9666802384941f3871cc36cc4ad5c93bacdfd2a4b9efab2f6cf1c2c33e', text: () => import('./assets-chunks/privacy_index_html.mjs').then(m => m.default)},
    'terms/index.html': {size: 113013, hash: 'ddf3c82500c895def2b9d15881c302753c8df142640eb071d539bac3fc6b0fa2', text: () => import('./assets-chunks/terms_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 113275, hash: '4376c1d9972f7388cd0bfffcfb7fd29d4b266fedd5781237d6fd27b84c4b8997', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-QJT5WNYB.css': {size: 171489, hash: 'H1MoFcGRd7M', text: () => import('./assets-chunks/styles-QJT5WNYB_css.mjs').then(m => m.default)}
  },
};
