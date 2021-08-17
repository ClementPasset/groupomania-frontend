import Form from '../../components/Form';
import { faUser, faIdBadge, faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

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
        firstName: '',
        lastName: '',
        mail: '',
        password: ''
    });

    let history = useHistory();

    const handleForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/user/signup/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
            <Form inputs={inputs} handleForm={handleForm} buttonText="S'inscrire" user={user} setUser={setUser} />
            <StyledLink to="/signin" >Déjà inscrit ? Connectez-vous</StyledLink>
        </section>
    );
};

export default Signup;