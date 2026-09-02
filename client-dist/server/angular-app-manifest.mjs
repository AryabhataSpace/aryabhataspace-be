
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
    'index.csr.html': {size: 78116, hash: '6f3d435d41d049cba2efccbf1e54064761ee239a2e9cbdc7c79f90a56860e582', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22210, hash: '9880c20988bf558512d45a29d9fa770ea37aa6d55f19930d9158101935fd3c7b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'privacy/index.html': {size: 113031, hash: 'e80c2108c541ba252979f3434f9b0e0114121b767f3520d063c616cfc09a691c', text: () => import('./assets-chunks/privacy_index_html.mjs').then(m => m.default)},
    'terms/index.html': {size: 113013, hash: '67dc9e13fad5aef6f8915797e77d7c9459d06e27fae15dd32dd452d0a4c8955a', text: () => import('./assets-chunks/terms_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 113275, hash: '6e342251ef57c17ea21d23448873f11e9834758467f11b2b03dc80423f53b3ca', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-QJT5WNYB.css': {size: 171489, hash: 'H1MoFcGRd7M', text: () => import('./assets-chunks/styles-QJT5WNYB_css.mjs').then(m => m.default)}
  },
};
