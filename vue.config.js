
module.exports = {
    // devServer: {
    //     open: process.platform === 'darwin',
    //     host: 'localhost',
    //     port: 3000, // CHANGE YOUR PORT HERE!
    //     https: false,
    //     hotOnly: false,
    // },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // production config
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            const productionGzipExtensions = ['js', 'css']
            config.plugins.push(
                    new CompressionWebpackPlugin({
                        asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.90,
                        deleteOriginalAssets: false
                    })
                )
        } else {
            // dev config
        }
    },
    pwa: {
        // configure the workbox plugin
        workboxOptions: {
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'my-images-cache',
                        expiration: {
                            maxEntries: 60,
                            maxAgeSeconds: 24 * 60 * 60, // 1 Days
                        },
                    }
                }
            ]
        }
    }
}