import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import Form from '../../components/Form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { useState } from 'react';

const inputs = [
    {
        name: 'mail',
        placeholder: 'Email',
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

    const [user, setUser] = useState({
        mail: '',
        password: ''
    });

    const handleForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/user/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    return (
        <section className="section">
            <h2 className="section__title">Connexion</h2>
            <Form inputs={inputs} handleForm={handleForm} buttonText="Se connecter" user={user} setUser={setUser} />
            <StyledLink to="/signup" >Pas encore de compte ? Inscrivez-vous</StyledLink>
        </section>
    );
};

export default Signup;