// reducer.js
import { combineReducers } from 'redux-immutable';
// 将recommend下的reducer注册到全局store
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers({
    // 之后开发具体功能模块的时候添加 reducer
    recommend: recommendReducer,
});