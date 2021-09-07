import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../../hooks/useHttp';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';

const CommentForm = ({ post }) => {

    const { sendRequest: postComment } = useHttp();
    const { isLogged } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        if (comment !== "") {
            postComment({
                url: `${process.env.REACT_APP_API_URL}/post/${post.id}/comment/`,
                params: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': isLogged.token
                    },
                    body: JSON.stringify({
                        content: comment,
                        postId: post.id,
                        userId: isLogged.userId
                    })
                }
            })
            history.go(0);
        }
    };

    const handleChange = (e) => {
        setComment(e.target.value)
    };

    return (
        <section className="section">
            <h3 className="section__title">Ajouter un commentaire</h3>
            <div className='formGroup'>
                <label htmlFor="newComment" className='formGroup__label formGroup__label--textarea'><FontAwesomeIcon icon={faComment} /></label>
                <textarea onChange={handleChange} id="newComment" name="newComment" className='formGroup__input textarea' value={comment} placeholder='Votre commentaire...'></textarea>
            </div>
            <button onClick={handleClick} className="btn">Commenter</button>
        </section>
    );
};

export default CommentForm;