module.exports = {
  title: 'Coder',
  themeConfig: {
    logo: '/image/cola.png',
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    sidebarDepth: 2,
    smoothScroll: true,
    repo: 'https://gitee.com/brucecai55520/bruceblog',
    repoLabel: 'Github',
  },
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/image/cola.ico' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
}