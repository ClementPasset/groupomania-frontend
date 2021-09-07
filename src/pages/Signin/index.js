import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import Form from '../../components/Form';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { useContext, useReducer } from 'react';
import userReducer from '../../reducers/userReducer';
import { AuthContext } from '../../utils/context';
import useHttp from '../../hooks/useHttp';

const inputs = [
    {
        name: 'mail',
        placeholder: 'Email',
        type: 'email',
        icon: faAt
    },
    {
        name: 'password',
        placeholder: 'Mot de passe',
        type: 'password',
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

const Signin = () => {

    const [userState, dispatchUser] = useReducer(userReducer,
        {
            value: { firstName: '', lastName: '', mail: '', password: '' },
            isValid: { firstName: null, lastName: null, mail: null, password: null }
        }
    );

    let history = useHistory();
    let url = "/";

    const handleRequest = data => {
        history.push(url);
        dispatchIsLogged({ type: 'LOGIN', value: { logged: true, userId: data.userId, isAdmin: data.isAdmin, token: data.token, tokenExpDate: data.expirationDate } });
    };

    const { error, sendRequest } = useHttp();

    let { dispatchIsLogged } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/user/signin/`,
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

    return (
        <section className="section">
            <h2 className="section__title">Connexion</h2>
            <Form inputs={inputs} actionType='SIGNIN_FORM' handleSubmit={handleSubmit} buttonText="Se connecter" userState={userState} dispatchUser={dispatchUser} />
            {error && <p style={{ margin: '1rem', textAlign: 'center' }}>{error}</p>}
            <StyledLink to="/signup" >Pas encore de compte ? Inscrivez-vous</StyledLink>
        </section >
    );
};

export default Signin;