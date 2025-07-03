import { useState, useEffect } from 'react';

type CustomCarouselProps = {
  images?: string[]; // 👈 optional prop
};

function CustomCarousel({ images = [] }: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlePause = () => setIsPaused(true);
  const handlePlay = () => setIsPaused(false);

  useEffect(() => {
    if (images.length === 0) return;

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, [isPaused, images.length]);

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500">No images available.</div>
    );
  }

  return (
    <div className="floating-carousel-container pt-8 drop-shadow-xl">
      {/* Carousel images */}
      <div className="carousel-wrapper relative h-64 sm:h-96 md:h-[450px]">
        {images.map((path, index) => (
          <div
            key={index}
            className={`carousel-item absolute inset-0 transition-opacity ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.6s ease-in-out' }}
          >
            <div className="carousel-image-container shadow-black drop-shadow-xl">
              <img
                src={path}
                alt=""
                aria-hidden="true"
                className="mx-auto h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-6 pb-6 pt-2 text-base sm:text-sm">
        <button type="button" onClick={handlePrev} className="px-4">
          Prev
        </button>
        <button
          type="button"
          onClick={isPaused ? handlePlay : handlePause}
          className="px-4"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button type="button" onClick={handleNext} className="px-4">
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomCarousel;
