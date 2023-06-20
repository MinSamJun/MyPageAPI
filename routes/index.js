const express = require('express');
const router = express.Router();
const postsRouter = require('./posts')
const commentsRouter = require('./comments')

// app.js 에서 app.use를 작성하기 깔끔해지고,
// 더 직관적이다.
const defaultRoutes = [
    {
        path: '/post',      // 라우터의 패스
        route: postsRouter, // 들어갈 라우터
    },
    {
        path: '/comment',
        route: commentsRouter,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;