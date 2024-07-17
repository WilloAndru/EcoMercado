import React , { useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function SliderContainer(props) {

    const [slide, setSlide] = useState({position: 0, index: 0});
    const totalImages = props.list.length;
    const imageWidth = 16;
    const visibleImages = 5;

    const elements = props.list.map((e, index) => {
        const blob = new Blob([new Uint8Array(e.image.data)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
    
        return (
            <button className={`${props.className}Btn`} key={index}>
                <img src={imageUrl} alt={e.name} />
                <p>{e.name}</p>
                {e.price ? <h3>$ {e.price}</h3> : null}
            </button>
        );
    });

    let canMoveLeft = slide.position > 0;
    let canMoveRight = slide.position < (totalImages - visibleImages) * imageWidth;
    
    const listSpans = [];
    for (let i = 0; i < (totalImages / visibleImages); i++) {
        listSpans.push(
            <span
                key={i}
                style={{ background: slide.index === i ? "#49cb5c" : "" }}
            >
            </span>
        );
    }

    const moveSlider = (direction) => {
        setSlide((prevState) => {
            switch (direction) {
                case "left":
                    return {
                        position: prevState.position - imageWidth * visibleImages,
                        index: prevState.index - 1
                    }
                case "right":
                    return {
                        position: prevState.position + imageWidth * visibleImages,
                        index: prevState.index + 1
                    }
            }
        })
    };

    return (
        <div className={`${props.className}Container flex`}>
            <button 
                className='arrowBtn flex'
                onClick={() => moveSlider("left")}
                style={{ visibility: canMoveLeft ? 'visible' : 'hidden' }}
            >
                <FaArrowLeft />
            </button>
            <div className={`${props.className}Div flex`}>
                <div className='headerDiv flex'>
                    <h2>{props.title}</h2>
                    <div className='flex'>{listSpans}</div>
                </div>
                <div 
                    className={`${props.className}List flex`}
                    style={{ transform: `translateX(-${slide.position}vw)` }} 
                >
                    {elements}
                </div>
            </div>
            <button 
                className='arrowBtn flex'
                onClick={() => moveSlider("right")}
                style={{ visibility: canMoveRight ? 'visible' : 'hidden' }}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}

export default SliderContainer