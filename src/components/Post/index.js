import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateFormat from "../../utils/helpers/DateFormat";
import TextFormat from "../../utils/helpers/TextFormat";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context';
import { faComments, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

const Post = ({ post, index }) => {
    const { isLogged } = useContext(AuthContext);
    const history = useHistory();
    const handleDelete = (e, id) => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': isLogged.token
            },
            body: JSON.stringify({ userId: isLogged.userId })
        })
            .then((response) => {
                if (response.ok) {
                    history.go(0)
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <section className="section">
            <h2 className="section__title"><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
            <p className="muted">Par {post.UserId ? `${post.User.firstName} ${post.User.lastName}` : 'un ancien utilisateur'} le {new DateFormat(post.createdAt).toString()}</p>
            {post.imgURL && <img className="post__img" src={`${process.env.REACT_APP_IMAGE_FOLDER}/${post.imgURL}`} alt='' />}
            <p className="section__text">{TextFormat.excerpt(post.content)}</p>
            {(isLogged.userId === post.UserId || isLogged.isAdmin) ? <span onClick={(e) => { handleDelete(e, post.id) }} className="post__delete"><FontAwesomeIcon icon={faTrash} /></span> : ''}
            <ul className="post__info">
                {isLogged.userId === post.UserId ? <li><Link to={`/edit/${post.id}`}><FontAwesomeIcon icon={faEdit} /> Modifier</Link></li> : ''}
                <li><Link to={`/post/${post.id}`}>Voir le post</Link></li>
                <li><FontAwesomeIcon icon={faComments} /> {post.Comments.length > 0 ? post.Comments.length : '0'} Commentaire{post.Comments.length > 1 ? 's' : ''}</li>
            </ul>
        </section>
    );
};

export default Post;