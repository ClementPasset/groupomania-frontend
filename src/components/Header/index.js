import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ links }) => {
    return (
        <header className="header">
            <img src={logo} alt="Groupomania logo" className="header__logo" />
            <nav>
                <ul className="header__nav">
                    {links.map((lien, index) => {
                        return (
                            <li key={`liens-${index}`} className="header__navitem">
                                <Link to={lien.path} className="header__navlink">{lien.label}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Header;