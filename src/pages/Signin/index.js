import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import Form from '../../components/Form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/colors';

const inputs = [
    {
        name: 'mail',
        placeholder: 'Mail',
        icon: faAt
    },
    {
        name: 'password',
        placeholder: 'Mot de passe',
        icon: faLock
    }
];

const StyledLink = styled(Link)`
    color: ${colors.orange};
    display:block;
    width:100%;
    text-align:center;
    text-decoration:none;
`;

const Signup = () => {
    return (
        <div className="signup">
            <h2 className="signup__title">Connexion</h2>
            <Form inputs={inputs} buttonText="Se connecter" />
            <StyledLink to="/signup" >Pas encore de compte ? Inscrivez-vous</StyledLink>
        </div>
    );
};

export default Signup;