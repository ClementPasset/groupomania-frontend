import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/context";
import { faHeading, faNewspaper, faImages } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../../hooks/useHttp';
import AddPost from "../../components/AddPost";
import Post from "../../components/Post";

const Landing = () => {

    const [posts, setPosts] = useState(null);
    const { isLogged } = useContext(AuthContext);
    const handleGetRequest = data => setPosts(data.posts);

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

    const { sendRequest: getPosts } = useHttp();


    useEffect(() => {
        if (isLogged.logged) {
            getPosts({
                url: `${process.env.REACT_APP_API_URL}/post`,
                params: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': isLogged.token
                    }
                }
            }, handleGetRequest);
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
                        <AddPost handleGetRequest={handleGetRequest} getPosts={getPosts} fields={fields} />
                        {posts.map((post, index) => (
                            <Post key={`posts-${index}`} index={index} post={post} posts={posts} setPosts={setPosts} />
                        ))}
                    </> :
                    <section className="section">Une erreur est survenue, merci de réessayer plus tard.</section>
            )
    );
};

export default Landing;