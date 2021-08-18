import Form from '../../components/Form';
import { faUser, faIdBadge, faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { Link, useHistory } from 'react-router-dom';
import { useReducer } from 'react';
import userReducer from '../../reducers/userReducer';

const inputs = [
    {
        name: 'firstName',
        placeholder: 'Prénom',
        type: 'text',
        icon: faUser
    },
    {
        name: 'lastName',
        placeholder: 'Nom',
        type: 'text',
        icon: faIdBadge
    },
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

const Signup = () => {

    const [userState, dispatchUser] = useReducer(userReducer, { value: { firstName: '', lastName: '', mail: '', password: '' }, isValid: { firstName: null, lastName: null, mail: null, password: null } });

    let history = useHistory();

    const handleForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/user/signup/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userState.value)
        })
            .then(response => {
                if (response.ok) {
                    let url = "/signin/";
                    history.push(url);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));
    }

    return (
        <section className="section">
            <h2 className="section__title">Inscription</h2>
            <Form inputs={inputs} actionType='SIGNUP_FORM' handleForm={handleForm} buttonText="S'inscrire" userState={userState} dispatchUser={dispatchUser} />
            <StyledLink to="/signin" >Déjà inscrit ? Connectez-vous</StyledLink>
        </section>
    );
};

export default Signup;