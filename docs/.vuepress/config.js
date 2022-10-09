module.exports = {
  title: 'Coder',
  base: '/cyh/',
  themeConfig: {
    logo: '/image/cola.png',
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    sidebarDepth: 2,
    smoothScroll: true,
    repo: 'https://github.com/Vayne-bit/Vayne-bit',
    repoLabel: 'Github',
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/image/cola.ico' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
}