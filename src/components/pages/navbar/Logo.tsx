import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../../assets/LOGO/FCBLogo.svg';

function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold text-black">
        <Link to="/" className="flex items-center">
          <span className="ml-2">
            <LogoSvg className="mr-5 h-24 w-24" />
          </span>
          HOME
        </Link>
      </h1>
    </div>
  );
}

export default Logo;
