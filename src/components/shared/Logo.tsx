import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../assets/FCBLogo.svg';

function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-lg text-black font-semibold">
        <Link to="/" className="flex items-center">
          <span className="ml-2">
            <LogoSvg className="h-24 w-24 mr-5" />
          </span>
          HOME
        </Link>
      </h1>
    </div>
  );
}

export default Logo;
