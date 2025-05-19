import cssnano from 'cssnano';
import EmbedYoutubePlugin from 'eleventy-plugin-youtube-embed';
import { feedPlugin as FeedPlugin } from '@11ty/eleventy-plugin-rss';
import htmlnano from 'htmlnano';
import {
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import MarkdownItAbbr from 'markdown-it-abbr';
import { markdownItImageSize as MarkdownItImageSize } from 'markdown-it-image-size';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';
import MarkdownItLinkAttrbutes from 'markdown-it-link-attributes';
import minifyXML from 'minify-xml';
import ReadMorePlugin from 'eleventy-plugin-read-more';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import SassPlugin from 'eleventy-plugin-dart-sass';
import SyntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
//import { version as SITE_VERSION } from './package.json' with { 'type': 'json' };
import WebpackPlugin from '@geoffdavis92/eleventy-plugin-webpack';

const IS_WATCHING =
  process.argv.includes('--serve') || process.argv.includes('--watch');
//const IS_WATCHING = false;

const { version: SITE_VERSION } = JSON.parse(readFileSync('./package.json'));

const INPUT_DIR = './src';
const CONTENT_DIR = `${INPUT_DIR}/content`;
const OUTPUT_DIR = './build';
const SITE_URL = 'https://svachon.com';

export default (config) => {
  config.addGlobalData('site', {
    lastModified: new Date(),
    url: SITE_URL,
    version: SITE_VERSION,
  });

  config.addPassthroughCopy(`${CONTENT_DIR}/blog/**/*.(jpg|png|svg|swf|webp)`);
  config.addPassthroughCopy({ [`${CONTENT_DIR}/../images`]: 'images' });

  config.addPlugin(EmbedYoutubePlugin);

  config.addPlugin(FeedPlugin, {
    collection: {
      limit: 10,
      name: 'blog-post',
    },
    metadata: {
      author: {
        //email: '',
        name: 'Steven Vachon',
      },
      base: SITE_URL,
      language: 'en',
      subtitle: 'Web development, design and animation.',
      title: 'Steven Vachon',
    },
    outputPath: '/blog/feed.xml',
    type: 'atom',
  });

  config.addPlugin(IdAttributePlugin, {
    selector: 'h2,h3,h4,h5,h6', // No h1
  });

  config.addPlugin(InputPathToUrlTransformPlugin);
  config.addPlugin(ReadMorePlugin);
  config.addPlugin(SyntaxHighlightPlugin);

  config.addPlugin(SassPlugin, {
    includePaths: ['node_modules'],
    outFileName: 'styles',
    outDir: resolve(OUTPUT_DIR),
    outPath: '',
    outputStyle: IS_WATCHING ? 'expanded' : 'compressed',
    sassIndexFile: '/index.scss',
    sassLocation: resolve(`${INPUT_DIR}/styles`),
    //sourceMap: IS_WATCHING, // https://github.com/AramZS/eleventy-plugin-dart-sass/issues/3
  });

  config.addPlugin(WebpackPlugin, {
    configFunction: (webpackConfig) => ({
      ...webpackConfig,
      devtool: IS_WATCHING ? 'source-map' : false,
      mode: IS_WATCHING ? 'development' : 'production',
    }),
    entryPoints: {
      scripts: `${INPUT_DIR}/scripts/index.js`,
    },
    output: OUTPUT_DIR,
  });

  config.addTransform('minify-css', async function (content) {
    if (!IS_WATCHING && (this.page.outputPath || '').endsWith('.css')) {
      return (await cssnano.process(content)).css;
    } else {
      return content;
    }
  });

  config.addTransform('minify-html', async function (content) {
    if (!IS_WATCHING && (this.page.outputPath || '').endsWith('.html')) {
      return (
        await htmlnano.process(content, {
          collapseWhitespace: true,
          minifyCss: true,
          minifySvg: false, // No need
          sortAttributesWithLists: false,
        })
      ).html;
    } else {
      return content;
    }
  });

  config.addTransform('minify-xml', async function (content) {
    if (!IS_WATCHING && (this.page.outputPath || '').endsWith('.xml')) {
      return minifyXML(content);
    } else {
      return content;
    }
  });

  config.amendLibrary('md', (mdLib) => {
    mdLib.set({ typographer: true });

    mdLib.use(MarkdownItAbbr, {
      globalAbbreviations: {
        a11y: 'Accessibility',
        API: 'Application Programming Interface',
        ARIA: 'Accessible Rich Internet Applications',
        AWS: 'Amazon Web Services',
        CD: 'Continuous Deployment',
        CDN: 'Content Delivery Network',
        CGI: 'Common Gateway Interface',
        CI: 'Continuous Integration',
        'CI/CD': 'Continuous Integration / Continuous Deployment',
        CLI: 'Command Line Interface',
        CMS: 'Content Management System',
        CORS: 'Cross-Origin Resource Sharing',
        CPU: 'Central Processing Unit',
        CRUD: 'Create, Read, Update, Delete',
        CSP: 'Content Security Policy',
        CSS: 'Cascading Style Sheets',
        DB: 'DataBase',
        DIY: 'Do It Yourself',
        DNS: 'Domain Name System',
        DOM: 'Document Object Model',
        DRY: `Don't Repeat Yourself`,
        E2E: 'End-to-End',
        fps: 'Frames Per Second',
        FUI: 'Flash User Interface',
        GB: 'Gigabyte(s)',
        GCP: 'Google Cloud Platform',
        GHz: 'Gigahertz',
        GIF: 'Graphics Interchange Format',
        Git: 'Global Information Tracker',
        GUI: 'Graphical User Interface',
        HTML: 'HyperText Markup Language',
        HTTP: 'HyperText Transfer Protocol',
        'HTTP/1.0': 'HyperText Transfer Protocol version 1.0',
        'HTTP/1.1': 'HyperText Transfer Protocol version 1.1',
        'HTTP/1.x': 'HyperText Transfer Protocol version 1',
        'HTTP/2': 'HyperText Transfer Protocol version 2',
        'HTTP/3': 'HyperText Transfer Protocol version 3',
        HTTPS: 'Secure HyperText Transfer Protocol',
        'I/O': 'Input / Output',
        i18n: 'Internationalization',
        IAM: 'Identity and Access Management',
        JPEG: 'Joint Photographic Experts Group',
        JS: 'JavaScript',
        JSON: 'JavaScript Object Notation',
        JSX: 'JavaScript XML (eXtensible Markup Language)',
        KB: 'Kilobyte(s)',
        l10n: 'Localization',
        MAP: 'Multi-Page Application',
        MB: 'Megabyte(s)',
        MHz: 'Megahertz',
        NPM: 'Node Package Manager',
        OLED: 'Organic Light Emitting Diode',
        OOP: 'Object-Oriented Programming',
        PHP: 'Hypertext Pre-Processor',
        PNG: 'Portable Network Graphics',
        RAM: 'Random Access Memory',
        REST: 'REpresentational State Transfer',
        RESTful: 'REpresentational State Transfer',
        S3: 'Simple Storage Service',
        SCSS: 'Sassy CSS (Cascading Style Sheets)',
        SEO: 'Search Engine Optimization',
        SOLID:
          'Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion',
        SPA: 'Single-Page Application',
        SSE: 'Server-Sent Events',
        SSI: 'Server-Side Includes',
        SVG: 'Scalable Vector Graphics',
        SWF: 'ShockWave Flash',
        TS: 'TypeScript',
        TSX: 'TypeScript XML (eXtensible Markup Language)',
        UI: 'User Interface',
        VPS: 'Virtual Private Server',
        WebGL: 'Web Graphics Library',
        WebP: 'Web Picture',
        XML: 'eXtensible Markup Language',
        XSS: 'Cross-Site Scripting',
        YAGNI: `You Aren't Gonna Need It`,
      },
    });

    mdLib.use(MarkdownItImageSize);

    mdLib.use(MarkdownItImplicitFigures, {
      figcaption: 'title',
      lazyLoading: true,
    });

    const isMeLink = (href) => {
      try {
        const hrefURL = new URL(href, SITE_URL);
        return [
          'github.com/stevenvachon',
          'linkedin.com/in/stevenvachon',
          'x.com/stevenvachon',
        ].some((meLink) =>
          `${hrefURL.hostname}${hrefURL.pathname}`.startsWith(meLink)
        );
      } catch {
        return false;
      }
    };

    mdLib.use(MarkdownItLinkAttrbutes, [
      {
        attrs: {
          rel: 'external noopener',
          target: '_blank',
        },
        matcher: (href /*, config*/) => {
          try {
            const siteURL = new URL(SITE_URL);
            const hrefURL = new URL(href, SITE_URL);
            return hrefURL.hostname !== siteURL.hostname && !isMeLink(href);
          } catch {
            return false;
          }
        },
      },
      {
        attrs: {
          rel: 'external me noopener',
          target: '_blank',
        },
        matcher: (href /*, config*/) => isMeLink(href),
      },
    ]);
  });

  return {
    dir: {
      input: CONTENT_DIR,
      layouts: '../layouts/', // Relative to `input` above
      output: OUTPUT_DIR,
    },
  };
};
