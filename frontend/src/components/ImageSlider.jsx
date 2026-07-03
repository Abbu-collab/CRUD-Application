import { useState } from "react";

const BACKEND_BASE = "http://localhost:5000/";
const FALLBACK_IMAGE = "https://via.placeholder.com/300?text=No+Image";

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState(new Set());

  if (!images || images.length === 0) {
    return <div className="no-image">No Image</div>;
  }

  const resolveSrc = (img) => {
    if (!img) return FALLBACK_IMAGE;
    const trimmed = String(img).trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("/")
    ) {
      return trimmed;
    }

    // Support URLs starting with www.example.com (no scheme)
    if (/^www\./i.test(trimmed) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(trimmed)) {
      return "https://" + trimmed;
    }

    return BACKEND_BASE + trimmed;
  };

  const handleError = (index, e) => {
    setFailedIndexes((prev) => new Set(prev).add(index));
    e.target.src = FALLBACK_IMAGE;
    console.warn(
      "Image failed to load, using fallback for index",
      index,
      e.target.src,
    );
  };

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const src = failedIndexes.has(current)
    ? FALLBACK_IMAGE
    : resolveSrc(images[current]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="image-slider">
      <img
        src={encodeURI(src)}
        alt="product"
        className="slider-image"
        onError={(e) => handleError(current, e)}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onClick={openModal}
        style={{ cursor: "pointer" }}
      />

      {isModalOpen && (
        <div
          className="image-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="image-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={encodeURI(resolveSrc(images[current]))}
              alt="full product"
              className="image-modal-img"
            />
          </div>
        </div>
      )}
      {images.length > 1 && (
        <>
          <button type="button" className="slider-btn prev" onClick={goPrev}>
            ‹
          </button>
          <button type="button" className="slider-btn next" onClick={goNext}>
            ›
          </button>
          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === current ? "dot active" : "dot"}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
