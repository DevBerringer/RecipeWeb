import { ReactComponent as LogoSvg } from '../../assets/Logo2.svg';

function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-lg text-black font-semibold">
        <a href="/" className="flex items-center">
          <span className="ml-2">
            <LogoSvg />
          </span>
          Recipe Central
        </a>
      </h1>
    </div>
  );
}

export default Logo;
