
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
    'index.csr.html': {size: 78116, hash: 'cf741aa1cbff64ec3c5d7a9e69559bee199a03604c1f3019a81dee6edb3e448e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22210, hash: '192b10d5edc6f1b486f5453cb9b29f010fccbc660ad4aa4d58d3792a39eebf5e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'privacy/index.html': {size: 113028, hash: 'db4653835f7847f60e1156cd51943b528a38494753445620a8f48ddfcecd4f69', text: () => import('./assets-chunks/privacy_index_html.mjs').then(m => m.default)},
    'terms/index.html': {size: 113010, hash: '6bb53c411721be8a738896decd13f29be286f49e1498276ae0db880004a55315', text: () => import('./assets-chunks/terms_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 113273, hash: '3b9ee8c4fc7cadc1d340a9d1dbe56c3b721ba4b63c71fe4d80cb8fcd49ae442d', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-7MK666LI.css': {size: 166301, hash: 'shPn8Y+/M8c', text: () => import('./assets-chunks/styles-7MK666LI_css.mjs').then(m => m.default)}
  },
};
