import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";

function SliderContainer(props) {
  const [slide, setSlide] = useState({ position: 0, index: 0 });
  const maxImages = 15;
  const imageWidth = 16;
  const maxVisibleImg = 5;
  const navigate = useNavigate();

  const goCategoryInterface = (id) => {
    localStorage.removeItem("valueInput");
    localStorage.setItem("idCategory", id);
    window.location.href = "/search";
  };

  const goProductInterface = (id) => {
    navigate(`/product/${id}`);
  };

  const elements = props.list.slice(0, maxImages).map((e, index) => {
    return (
      <button
        className={`${props.className}Btn flex1`}
        key={index}
        onClick={
          props.className === "category"
            ? () => goCategoryInterface(e.id)
            : () => goProductInterface(e.id)
        }
      >
        <img src={e.image} alt={e.name} />
        <p>{e.name}</p>
        {e.price ? <h3>{formatPrice(e.price)}</h3> : null}
      </button>
    );
  });

  let canMoveLeft = slide.position > 0;
  let canMoveRight =
    slide.position < (elements.length - maxVisibleImg) * imageWidth;

  const listSpans = [];
  if (elements.length > maxVisibleImg) {
    for (let i = 0; i < elements.length / maxVisibleImg; i++) {
      listSpans.push(
        <span
          key={i}
          style={{ background: slide.index === i ? "#49cb5c" : "" }}
        ></span>
      );
    }
  }

  const moveSlider = (direction) => {
    setSlide((prevState) => {
      switch (direction) {
        case "left":
          return {
            position: prevState.position - imageWidth * maxVisibleImg,
            index: prevState.index - 1,
          };
        case "right":
          return {
            position: prevState.position + imageWidth * maxVisibleImg,
            index: prevState.index + 1,
          };
      }
    });
  };

  return (
    <div className={`${props.className}Container flex1`}>
      {/* Flecha Izquierda */}
      <button
        className="arrowBtn flex1"
        onClick={() => moveSlider("left")}
        style={{ visibility: canMoveLeft ? "visible" : "hidden" }}
      >
        <FaArrowLeft />
      </button>
      {/* Slider */}
      <div className={`${props.className}Div flex1`}>
        {/* Header */}
        <div className="headerDiv flex1">
          <h2>{props.title}</h2>
          <div className="flex1">{listSpans}</div>
        </div>
        {/* Contenedor Productos */}
        <div
          className={`${props.className}List flex1`}
          style={{ transform: `translateX(-${slide.position}vw)` }}
        >
          {elements}
        </div>
      </div>
      {/* Flecha derecha */}
      <button
        className="arrowBtn flex1"
        onClick={() => moveSlider("right")}
        style={{ visibility: canMoveRight ? "visible" : "hidden" }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default SliderContainer;
