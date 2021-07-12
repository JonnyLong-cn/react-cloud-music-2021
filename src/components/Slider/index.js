import React,{useState,useEffect} from 'react';
import { SliderContainer } from './style.js';
import Swiper from 'swiper';
import "swiper/swiper-bundle.css";

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper('.slider-container', {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            });
            setSliderSwiper(newSliderSwiper);
        }
    }, [bannerList.length, sliderSwiper])
    return (
        <SliderContainer>
            {/* 让轮播图有半边的红色背景衬托 */}
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map((slider) => {
                            return (
                                <div className="swiper-slide" key={slider.imageUrl}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    );
}

export default React.memo(Slider);