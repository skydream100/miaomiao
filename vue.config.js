module.exports = {
    devServer: {
        // 反向代理 从/api这里开始去代理
        proxy: {
            '/api' : {
                // 反向代理目标
                target : 'http://39.97.33.178',
                // 是否改变地址
                changeOrigin: true
            }
        }
    }
}