import BScroll from "@better-scroll/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef, useMemo } from 'react';
import { debounce } from "../../api/utils";
// 加载动画组件
import Loading from '../loading/index';
import Loading2 from '../loading-v2/index';

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const PullUpLoading = styled.div`
    position: absolute;
    left:0; right:0;
    bottom: 5px;
    width: 60px;
    height: 60px;
    margin: auto;
    z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const Scroll = forwardRef((props, ref) => {
    // better-scroll实例对象,局部state,
    const [bScroll, setBScroll] = useState();
    // 创建锚点
    const scrollContainerRef = useRef();
    // 从外面接收props，解构赋值
    const {
        direction,
        click,
        refresh,
        onScroll,
        pullUpLoading,
        pullDownLoading,
        pullUp,
        pullDown,
        bounceTop,
        bounceBottom
    } = props;

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 500);
    }, [pullUp])
    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 500)
    }, [pullDown]);

    // 创建better-scroll
    useEffect(() => {
        /**
         * scrollX：当为true时开启横向滚动
         * scrollY：当为true时开启纵向滚动
         * probeType: 3 任何时候都派发scroll事件
         * click：BetterScroll 默认会阻止浏览器的原生click事件。
         *      当设置为true，BetterScroll会派发一个click事件。
         * bounce：对应方向是否有动画回弹
         */
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizontal",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        // 在组件卸载时，执行该函数，清理副效应。
        return () => {
            setBScroll(null);
        }
    }, []);
    // 给实例绑定事件函数onScroll，这个函数默认为null
    useEffect(() => {
        // 当bScroll对象和事件函数有一个为空时候就返回
        if (!bScroll || !onScroll) return;
        // 否则进行绑定
        bScroll.on('scroll', onScroll)
        return () => {
            bScroll.off('scroll', onScroll);
        }
    }, [onScroll, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullUp) return;
        const handlePullUp = () => {
            // 判断是否滑动到了底部，如果上拉到底部触发防抖函数
            // 纵向滚动的位置区间是 [minScrollY, maxScrollY]，并且 maxScrollY 是负值
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce();
            }
        };
        // 滚动结束时触发
        bScroll.on('scrollEnd', handlePullUp);
        return () => {
            bScroll.off('scrollEnd', handlePullUp);
        }
    }, [pullUp, pullUpDebounce, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullDown) return;
        // 函数传入参数是当前点触的位置
        const handlePullDown = (pos) => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce();
            }
        };
        // 用户手指离开滚动区域时触发
        bScroll.on('touchEnd', handlePullDown);
        return () => {
            bScroll.off('touchEnd', handlePullDown);
        }
    }, [pullDown, pullDownDebounce, bScroll]);

    // 重新计算BetterScroll
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    // useImperativeHandle第二个参数返回的对象的内容挂载到父组件的ref.current上
    useImperativeHandle(ref, () => ({
        // 如果bScroll不为空就重新计算，同时滑动到坐标(0,0)
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        // 获取bScroll
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    // 控制两个加载动画是否显示
    const PullUpDisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
    const PullDownDisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
    return (
        <ScrollContainer ref={scrollContainerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpDisplayStyle}><Loading></Loading></PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={PullDownDisplayStyle}><Loading2></Loading2></PullDownLoading>
        </ScrollContainer>
    );
});

// Scroll默认传值，这个一定要有
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

// Scroll传入参数验证
Scroll.propTypes = {
    // 方向必须是数组中的某一个
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    bounceTop: PropTypes.bool,
    bounceBottom: PropTypes.bool
};

export default Scroll;