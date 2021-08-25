import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context';

const Header = () => {

    const { isLogged, dispatchIsLogged } = useContext(AuthContext);

    const signOut = () => {
        dispatchIsLogged({ type: 'LOGOUT' });
    }

    let links = isLogged.logged ?
        [
            {
                path: '/',
                label: 'Accueil'
            },
            {
                path: '/profile',
                label: 'Mon profil'
            },
            {
                path: '/admin',
                label: 'Admin'
            },
            {
                path: '/',
                label: 'Se déconnecter',
                onClick: signOut
            }
        ] :
        [
            {
                path: '/',
                label: 'Accueil'
            },
            {
                path: '/signin',
                label: 'Se connecter'
            },
            {
                path: '/signup',
                label: 'S\'inscrire'
            }
        ];

    if (!isLogged.isAdmin) {
        links = links.filter(elt => elt.label !== 'Admin');
    }

    return (
        <header className="header">
            <img src={logo} alt="Groupomania logo" className="header__logo" />
            <nav>
                <ul className="header__nav">
                    {links.map((lien, index) => {
                        return (
                            <li key={`liens-${index}`} className="header__navitem">
                                <Link onClick={lien.onClick} to={lien.path} className="header__navlink">{lien.label}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Header;