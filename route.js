exports.ROUTES = [
    {
        url: '/user-api',
        auth: false,
        rateLimit: {
            windowMS: 1 * 60 * 1000,
            max: 60,
        },
        proxy: {
            target: process.env['USER_SERVICE'],
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
    {
        url: '/blog-api',
        auth: false,
        rateLimit: {
            windowMS: 1 * 60 * 1000,
            max: 60,
        },
        proxy: {
            target: process.env['BLOG_SERVICE'],
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
    {
        url: '/comment-api',
        auth: false,
        rateLimit: {
            windowMS: 1 * 60 * 1000,
            max: 60,
        },
        proxy: {
            target: process.env['COMMENT_SERVICE'],
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
    {
        url: '/like-api',
        auth: false,
        rateLimit: {
            windowMS: 1 * 60 * 1000,
            max: 60,
        },
        proxy: {
            target: process.env['LIKE_SERVICE'],
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
    {
        url: '/file-api',
        auth: false,
        rateLimit: {
            windowMS: 1 * 60 * 1000,
            max: 120,
        },
        proxy: {
            target: process.env['FILE_SERVICE'],
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
]
