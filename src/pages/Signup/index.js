import Form from '../../components/Form';
import { faUser, faIdBadge, faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useReducer } from 'react';
import userReducer from '../../reducers/userReducer';
import { AuthContext } from '../../utils/context';
import useHttp from '../../hooks/useHttp';

const inputs = [
    {
        name: 'firstName',
        placeholder: 'Prénom',
        type: 'text',
        icon: faUser,
        errorText: 'Votre prénom ne doit pas contenir d\'espace ou de chiffre.'
    },
    {
        name: 'lastName',
        placeholder: 'Nom',
        type: 'text',
        icon: faIdBadge,
        errorText: 'Votre nom ne doit pas contenir d\'espace ou de chiffre.'
    },
    {
        name: 'mail',
        placeholder: 'Email',
        type: 'email',
        icon: faAt,
        errorText: "Adresse mail non valide."
    },
    {
        name: 'password',
        placeholder: 'Mot de passe',
        type: 'password',
        icon: faLock,
        errorText: 'Votre mot de passe doit contenir au moins 8 caractères dont 1 minuscule, 1 majuscule et 1 chiffre.'
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

    const [userState, dispatchUser] = useReducer(userReducer,
        {
            value: { firstName: '', lastName: '', mail: '', password: '' },
            isValid: { firstName: null, lastName: null, mail: null, password: null }
        }
    );
    const { dispatchIsLogged } = useContext(AuthContext);

    const handleRequest = data => {
        history.push(url);
        dispatchIsLogged({ type: 'LOGIN', value: { logged: true, userId: data.userId, isAdmin: data.isAdmin, token: data.token, tokenExpDate: data.expirationDate } });
    }

    const { error, sendRequest } = useHttp();

    let history = useHistory();
    let url = "/";

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = Object.keys(userState.isValid).reduce((acc, currVal) => {
            return userState.isValid[currVal] !== true ? false : true;
        });

        if (isValid) {
            sendRequest({
                url: `${process.env.REACT_APP_API_URL}/user/signup`,
                params: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userState.value)
                }
            }, handleRequest);
        }
    }

    return (
        <section className="section">
            <h2 className="section__title">Inscription</h2>
            <Form inputs={inputs} actionType='SIGNUP_FORM' handleSubmit={handleSubmit} buttonText="S'inscrire" userState={userState} dispatchUser={dispatchUser} />
            {error && <p style={{ margin: '1rem', textAlign: 'center' }}>{error === 'SequelizeUniqueConstraintError' ? "Un compte avec cette adresse email existe déjà." : 'Une erreur a été rencontrée'}</p>}
            <StyledLink to="/signin" >Déjà inscrit ? Connectez-vous</StyledLink>
        </section>
    );
};

export default Signup;