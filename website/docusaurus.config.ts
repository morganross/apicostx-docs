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
          title: 'Main',
          items: [
            {label: 'About', href: 'https://apicostx.com/about/'},
            {label: 'Pricing', href: 'https://apicostx.com/membership-levels/'},
            {label: 'APP', href: 'https://apicostx.com/app/'},
            {label: 'Docs', to: '/'},
          ],
        },
        {
          title: 'Account',
          items: [
            {label: 'Security', href: 'https://apicostx.com/security/'},
            {label: 'Buy Credits', href: 'https://apicostx.com/credits/'},
            {label: 'Log In', href: 'https://apicostx.com/login/'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} API Cost X`,
    },
    prism: {
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
