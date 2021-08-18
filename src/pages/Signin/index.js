import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import Form from '../../components/Form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { useReducer } from 'react';
import userReducer from '../../reducers/userReducer';

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
        type: 'text',
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

    const [userState, dispatchUser] = useReducer(userReducer, { value: { firstName: '', lastName: '', mail: '', password: '' }, isValid: { firstName: null, lastName: null, mail: null, password: null } });


    const handleForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/user/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userState)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    return (
        <section className="section">
            <h2 className="section__title">Connexion</h2>
            <Form inputs={inputs} actionType='SIGNIN_FORM' handleForm={handleForm} buttonText="Se connecter" userState={userState} dispatchUser={dispatchUser} />
            <StyledLink to="/signup" >Pas encore de compte ? Inscrivez-vous</StyledLink>
        </section>
    );
};

export default Signin;