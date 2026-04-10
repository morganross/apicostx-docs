import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repository = process.env.GITHUB_REPOSITORY ?? 'morganross/apicostx-docs';
const [organizationName, projectName] = repository.split('/');
const defaultSiteUrl = 'https://apicostx.com';
const defaultBaseUrl = '/docs-static/';
const url = process.env.DOCS_SITE_URL ?? defaultSiteUrl;
const baseUrl = process.env.DOCS_BASE_URL ?? defaultBaseUrl;

const config: Config = {
  title: 'ACM Documentation',
  tagline: 'Help, operations, and developer documentation for ACM / API Cost X',
  url,
  baseUrl,
  trailingSlash: false,
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
    navbar: {
      title: 'ACM Docs',
      logo: {
        alt: 'ACM Docs',
        src: 'img/logo.svg',
      },
      items: [
        {type: 'doc', docId: 'home', position: 'left', label: 'Overview'},
        {to: '/help', position: 'left', label: 'Help'},
        {to: '/users/app-overview', position: 'left', label: 'Users'},
        {to: '/admins/frontend-operations', position: 'left', label: 'Admins'},
        {
          to: '/devs/frontend',
          position: 'left',
          label: 'Developers',
        },
        {
          href: `https://github.com/${repository}`,
          position: 'right',
          label: 'GitHub',
        },
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
