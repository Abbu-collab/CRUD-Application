import { useState, useEffect } from 'react';

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="no-image">No Image</div>;
  }

  return (
    <div className="image-slider">
      <img
        src={images[current]}
        alt="product"
        className="slider-image"
        onClick={() => setIsModalOpen(true)}
      />
      {images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <span key={index} className={index === current ? 'dot active' : 'dot'}></span>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <img src={images[current]} alt="full product" className="image-modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSlider;