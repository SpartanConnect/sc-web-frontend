module.exports = {
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /connectapi\.lchsspartans\.net\/announcements/,
        handler: 'networkFirst'
    }]
}
