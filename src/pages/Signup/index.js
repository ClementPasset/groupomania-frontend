import Form from '../../components/Form';
import { faUser, faIdBadge, faAt, faLock, faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { Link } from 'react-router-dom';

const inputs = [
    {
        name: 'firstName',
        placeholder: 'Prénom',
        icon: faUser
    },
    {
        name: 'lastName',
        placeholder: 'Nom',
        icon: faIdBadge
    },
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
            <h2 className="signup__title">Inscription</h2>
            <Form inputs={inputs} buttonText="S'inscrire" />
            <StyledLink to="/signin" >Déjà inscrit ? Connectez-vous</StyledLink>
        </div>
    );
};

export default Signup;