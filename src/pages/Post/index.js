import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBlock from "../../components/CommentBlock";
import CommentForm from "../../components/CommentForm";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../../utils/context";
import DateFormat from "../../utils/helpers/DateFormat";

const Post = () => {

    const { isLogged } = useContext(AuthContext);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const handleRequest = data => setPost(data);
    const { sendRequest: getPost } = useHttp();

    useEffect(() => {
        getPost({
            url: `${process.env.REACT_APP_API_URL}/post/${postId}`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, handleRequest);
    }, []);

    useEffect(() => {
        console.log('Post : ', post)
    }, [post]);

    return post ? (
        <>
            <section className="section">
                <h2 className="section__title">{post.title}</h2>
                <p className="muted">{`Écrit par ${post.UserId ? `${post.User.firstName} ${post.User.lastName}` : 'un ancien utilisateur'} le ${new DateFormat(post.createdAt).toString()}`}</p>
                {post.imgURL && <img alt='' src={`${process.env.REACT_APP_IMAGE_FOLDER}/${post.imgURL}`} />}
                <p className="section__text">{post.content}</p>
            </section>
            {post.Comments.length > 0 && <CommentBlock comments={post.Comments} />}
            <CommentForm post={post} />
        </>
    ) :
        (
            <section className="section">
                <h2 className="section__title">Une erreur est survenue.</h2>
                <p className="section__text">Impossible de charger le post.</p>
            </section>
        );
};

export default Post;