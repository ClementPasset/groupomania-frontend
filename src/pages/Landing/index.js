import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/context";
import { faHeading, faNewspaper, faImages, faComments } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../../hooks/useHttp';
import AddPost from "../../components/AddPost";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Landing = () => {

    const [posts, setPosts] = useState(null);
    const { isLogged } = useContext(AuthContext);
    const handleRequest = data => {
        console.log(data);
        setPosts(data.posts);
    };

    const { sendRequest: getPosts } = useHttp({
        url: `${process.env.REACT_APP_API_URL}/post`, params: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': isLogged.token
            }
        }
    }, handleRequest);

    const fields = [
        {
            name: 'title',
            placeholder: 'Titre',
            type: 'text',
            icon: faHeading
        },
        {
            name: 'content',
            placeholder: 'Contenu de votre post...',
            type: 'textarea',
            icon: faNewspaper
        },
        {
            name: 'imageUrl',
            placeholder: 'Ajouter une image',
            type: 'file',
            icon: faImages
        }
    ];

    useEffect(() => {
        if (isLogged.logged) {
            getPosts();
        }
    }, [isLogged.logged]);

    return (
        !isLogged.logged ? (<section className="section">
            <h2 className="section__title">Groupomania</h2>
            <p className="section__text">
                Bienvenue sur le réseau de Groupomania.<br />
                Ici, n'hésitez pas à partager avec vos collègues pour apprendre à mieux vous connaître !<br />
                Inscrivez-vous pour commencer à échanger !
            </p>
        </section>) :
            (
                posts ?
                    <>
                        <AddPost getPosts={getPosts} fields={fields} />
                        {posts.map((elt, index) => (
                            <section key={`posts-${index}`} className="section">
                                <h2 className="section__title"><Link to={`/post/${elt.id}`}>{elt.title}</Link></h2>
                                {elt.User && <p className="muted">Par {elt.User.firstName + ' ' + elt.User.lastName}</p>}
                                {!elt.User && <p className="muted">Par un ancien utilisateur</p>}
                                {elt.imgURL && <img className="post__img" src={`http://localhost:3001/images/${elt.imgURL}`} alt='' />}
                                <p className="section__text">{elt.content}</p>
                                <ul className="post__info">
                                    <li><FontAwesomeIcon icon={faComments} /> {elt.Comments.length > 0 ? elt.Comments.length : '0'} Commentaire{elt.Comments.length > 1 ? 's' : ''}</li>
                                </ul>
                            </section>
                        ))}
                    </> :
                    <section className="section">Une erreur est survenue, merci de réessayer plus tard.</section>
            )
    );
};

export default Landing;