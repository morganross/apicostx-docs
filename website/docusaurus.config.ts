import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repository = process.env.GITHUB_REPOSITORY ?? 'morganross/apicostx-docs';
const [organizationName, projectName] = repository.split('/');
const defaultSiteUrl = `https://${organizationName}.github.io`;
const defaultBaseUrl = `/${projectName}/`;
const url = process.env.DOCS_SITE_URL || defaultSiteUrl;
const baseUrl = process.env.DOCS_BASE_URL || defaultBaseUrl;

const config: Config = {
  title: 'ACM Documentation',
  tagline: 'Help, operations, and developer documentation for ACM / API Cost X',
  url,
  baseUrl,
  trailingSlash: false,
  stylesheets: [
    'https://apicostx.com/wp-content/themes/twentytwentyfive/assets/css/acx-shared-fonts.css?v=20260410-system',
  ],
  organizationName,
  projectName,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: [],
  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'API Cost X',
      items: [
        {href: 'https://apicostx.com/about/', position: 'right', label: 'About', target: '_self'},
        {
          href: 'https://apicostx.com/membership-levels/',
          position: 'right',
          label: 'Pricing',
          target: '_self',
        },
        {href: 'https://apicostx.com/app/', position: 'right', label: 'APP', target: '_self'},
        {href: 'https://apicostx.com/login/', position: 'right', label: 'Log In', target: '_self'},
        {
          to: '/',
          position: 'right',
          label: 'Docs',
          className: 'acx-navbar-docs-link',
        },
        {href: 'https://apicostx.com/security/', position: 'right', label: 'Security', target: '_self'},
        {href: 'https://apicostx.com/credits/', position: 'right', label: 'Buy Credits', target: '_self'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start Here',
          items: [
            {label: 'Help Center', to: '/help'},
            {label: 'Getting Started', to: '/help/getting-started'},
            {label: 'Quickstart', to: '/quickstart'},
          ],
        },
        {
          title: 'Guides',
          items: [
            {label: 'Users', to: '/users/app-overview'},
            {label: 'Admins', to: '/admins/frontend-operations'},
            {label: 'Developers', to: '/devs/frontend'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} ACM Docs`,
    },
    prism: {
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
