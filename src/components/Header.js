
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__container">
        <img src={logo} alt="Логотип сайта Место" className="header__logo" />
    </header>
  );
}

export default Header;