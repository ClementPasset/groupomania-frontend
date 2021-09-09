import DateFormat from "../../utils/helpers/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import useHttp from '../../hooks/useHttp';
import { useHistory } from "react-router";

const Comment = ({ comment }) => {
    let commentDate = new DateFormat(comment.createdAt);
    const { isLogged } = useContext(AuthContext);
    const { sendRequest } = useHttp();
    const history = useHistory();

    const handleDelete = () => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${comment.PostId}/comment/${comment.id}`,
            params: {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                },
                body: JSON.stringify({ userId: isLogged.userId })
            }
        }, () => history.go(0));
    };

    return (
        <div className="comment">
            <div className="comment__author">
                <img className="comment__authorImg" alt="" src={comment.UserId ? `${process.env.REACT_APP_IMAGE_FOLDER}/${comment.User.profilePictureUrl}` : `${process.env.REACT_APP_IMAGE_FOLDER}/defaultUser.jpg`} />
                <p className="comment__authorName">{comment.UserId ? `${comment.User.firstName} ${comment.User.lastName}` : 'Un ancien utilisateur'} le {commentDate.toString()} à {commentDate.time()} :</p>
                {(isLogged.userId === comment.UserId || isLogged.isAdmin) ? <span onClick={handleDelete} className="delete noAbs"><FontAwesomeIcon icon={faTrash} /></span> : ''}
            </div>
            <p className="comment__content">
                {comment.content}
            </p>
        </div>
    );
};

export default Comment;