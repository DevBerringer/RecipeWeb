import { useEffect } from 'react';
import { ReactComponent as LogoSVG } from '../../assets/LOGO/FCBLogo.svg';
import CustomCarousel from '../shared/CustomCarousel';

function Home() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="inline-block justify-center">
          <LogoSVG className="h-48 w-48" />
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-2xl">
        <CustomCarousel images={imagePaths} />
      </div>
      <p className="pt-10 text-center">
        Designs and Sketches by 叶秀文（Ye Xiuwen）
      </p>
    </div>
  );
}

export default Home;
