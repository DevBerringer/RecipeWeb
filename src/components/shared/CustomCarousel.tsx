import React, { useState, useEffect } from 'react';

function CustomCarousel({ imagePaths }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length
    );
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const autoPlayNext = () => {
    if (!isPaused) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoPlayNext, 3500);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="floating-carousel-container pt-8 drop-shadow-xl">
      <div className="carousel-wrapper relative h-[450px]">
        {imagePaths.map((path, index) => (
          <div
            key={index}
            className={`carousel-item absolute left-0 top-0 h-full w-full transition-opacity ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transition: 'opacity 0.6s ease-in-out',
            }}
          >
            <div className="carousel-image-container shadow-black drop-shadow-xl">
              <img
                src={path}
                alt={`${index + 1}`}
                className="mx-auto h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex">
        <button
          type="button"
          onClick={handlePrev}
          className="carousel-button prev-button ml-auto pr-4"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={isPaused ? handlePlay : handlePause}
          className="carousel-button pause-button px-4"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="carousel-button next-button mr-auto pl-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomCarousel;
