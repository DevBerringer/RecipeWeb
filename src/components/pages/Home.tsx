import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { ReactComponent as LogoSVG } from '../../assets/LOGO/FCBLogo.svg';
import { UseAuth } from '../../contexts/authContext';
import ButtonDropdowns from '../shared/ButtonDropdowns';

function Home() {
  const { user } = UseAuth();

  const imagePaths = [
    '/assets/stickSoup.jpg',
    '/assets/burgerBig.jpg',
    '/assets/sushiSnackBig.jpg',
    '/assets/drinksBig.jpg',
    '/assets/croissantBig.jpg',
    '/assets/eggTartBig.jpg',
    '/assets/watermelonBig.jpg',
    '/assets/cakeBig.jpeg',
    '/assets/dumpling.jpg',
    '/assets/spicyNoodle.jpg',
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="inline-block justify-center">
          <LogoSVG className="h-48 w-48" />
        </div>
        <div className="mx-52 w-full max-w-5xl pt-5">
          <ButtonDropdowns /> {/* Use the ButtonDropdowns component here */}
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-2xl">
        <div className="floating-carousel-container pt-8 drop-shadow-xl">
          <AliceCarousel
            touchMoveDefaultEvents
            autoPlay
            infinite
            touchTracking={false}
            autoPlayInterval={1500}
            animationDuration={1500}
            autoPlayStrategy="none"
            disableButtonsControls
            disableDotsControls
            items={imagePaths.map((path, index) => (
              <div key={index} className="carousel-item">
                <div className="carousel-image-container shadow-black drop-shadow-xl">
                  <img
                    src={path}
                    alt={`${index + 1}`}
                    className="mx-auto h-[450px] object-cover py-3"
                  />
                </div>
              </div>
            ))}
          />
        </div>
      </div>
      <p className="pt-10 text-center">
        Designs and Sketches by 叶秀文（Ye Xiuwen）
      </p>
    </div>
  );
}

export default Home;
