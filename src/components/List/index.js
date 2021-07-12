import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListWrapper, ListItem, List } from './style';
import { getCount } from "../../api/utils";
import LazyLoad from 'react-lazyload';

function RecommendList(props) {
    return (
        <div>
            <ListWrapper>
                <h1 className="title">推荐歌单</h1>
                <List>
                    {
                        props.recommendList.map((item, index) => {
                            return (
                                <ListItem key={item.id + index}>
                                    <div className="img_wrapper">
                                        <div className="decorate"></div>
                                        <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                                            {/* 加上参数可以减少请求的图片的资源大小 */}
                                            <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                                        </LazyLoad>
                                        <div className="play_count">
                                            <i className="iconfont play">&#xe885;</i>
                                            <span className="count">{getCount(item.playCount)}</span>
                                        </div>
                                    </div>
                                    <div className="desc">{item.name}</div>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </ListWrapper>
        </div>
    )
}

export default withRouter(React.memo(RecommendList));
