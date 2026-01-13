import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";

// Slider reutilizable tanto para categorias como productos
function SliderContainer(props) {
  const [slide, setSlide] = useState({ position: 0, index: 0 });
  const maxImages = 15;
  const imageWidth = 16;
  const maxVisibleImg = 5;
  const numberSpans = Math.ceil(props.list.length / maxVisibleImg);
  const navigate = useNavigate();

  let canMoveLeft = slide.position > 0;
  let canMoveRight = slide.index + 1 !== numberSpans;

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
    <div className="flex items-center gap-[1vw]">
      {/* Flecha Izquierda */}
      <button
        className="text-3xl hover:text-primary"
        onClick={() => moveSlider("left")}
        style={{ visibility: canMoveLeft ? "visible" : "hidden" }}
      >
        <FaArrowLeft />
      </button>
      {/* Slider */}
      <section
        className={`flex items-start gap-1 flex-col overflow-hidden w-[81vw] py-2 px-[1vw] ${
          props.className === "product" ? "bg-white rounded-xl" : "gap-8"
        }`}
      >
        {/* Header */}
        <div className="w-full justify-between flex items-center">
          <h2>{props.title}</h2>
          {/* Spans */}
          {props.className === "product" && (
            <div className="flex items-center gap-3">
              {Array.from({ length: numberSpans }, (_, i) => (
                <span
                  key={i}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                  style={{ background: slide.index === i ? "#49cb5c" : "" }}
                ></span>
              ))}
            </div>
          )}
        </div>
        {/* Contenedor Productos */}
        <div
          className={`flex gap-[1vw] mt-2 transition-transform duration-500 ease-in-out flex-start`}
          style={{ transform: `translateX(-${slide.position}vw)` }}
        >
          {props.list.slice(0, maxImages).map((e, index) => {
            return (
              <button
                className={`flex flex-col gap-1 overflow-hidden w-[15vw] hover:animate-[slide-top_0.2s_linear_both] ${
                  props.className === "product"
                    ? "text-start items-start"
                    : "items-center"
                }`}
                key={index}
                onClick={
                  props.className === "category"
                    ? () => {
                        localStorage.setItem("idCategory", e.id);
                        navigate("/search");
                      }
                    : () => navigate(`/product/${e.id}`)
                }
              >
                <img
                  className={
                    props.className === "product"
                      ? "h-60 rounded-xl w-[15vw] object-cover"
                      : "w-12"
                  }
                  src={e.image}
                  alt={e.name}
                />
                <p>{e.name}</p>
                {e.price ? <h4>{formatPrice(e.price)}</h4> : null}
              </button>
            );
          })}
        </div>
      </section>
      {/* Flecha derecha */}
      <button
        className="text-3xl hover:text-primary"
        onClick={() => moveSlider("right")}
        style={{ visibility: canMoveRight ? "visible" : "hidden" }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default SliderContainer;
