/**
 * @introduce App组件
 * @description 主要防止的是页面的路由，并配置全局redux
 */
import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';

// 路由模块
import { HashRouter } from 'react-router-dom';
// renderRoutes读取路由配置转化为Route标签
import { renderRoutes } from 'react-router-config';
import routes from './routes/index.js';

// Redux模块
import store from './store/index';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle />
                <IconStyle />
                {renderRoutes(routes)}
            </HashRouter>
        </Provider>
    );
}

export default App;
