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
      <div className="carousel-wrapper relative w-64 h-64 mx-auto mb-4 sm:w-80 sm:h-80 [@media(min-width:1000px)]:w-[30rem] [@media(min-width:1000px)]:h-[30rem] lg:w-[700px] lg:h-[700px]">
        {images.map((path, index) => (
          <div
            key={index}
            className={`carousel-item absolute inset-0 transition-opacity ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.6s ease-in-out' }}
          >
            <div className="carousel-image-container h-full w-full shadow-black drop-shadow-xl">
              <img
                src={path}
                alt=""
                aria-hidden="true"
                className="mx-auto h-full w-full rounded-lg object-cover" /* Added rounded-lg for a nicer look */
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 pb-6 pt-2 text-base sm:gap-6 sm:text-sm">
        <button type="button" onClick={handlePrev} className="px-2 sm:px-4">
          Prev
        </button>
        <button
          type="button"
          onClick={isPaused ? handlePlay : handlePause}
          className="px-2 sm:px-4"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button type="button" onClick={handleNext} className="px-2 sm:px-4">
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomCarousel;
