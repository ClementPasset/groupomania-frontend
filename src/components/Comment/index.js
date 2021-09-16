import DateFormat from "../../utils/helpers/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context";
import useHttp from '../../hooks/useHttp';
import DeletePopup from '../DeletePopup';
import Popup from '../../utils/helpers/Popup';

const Comment = ({ comment, comments, setComments }) => {
    let commentDate = new DateFormat(comment.createdAt);
    const { isLogged } = useContext(AuthContext);
    const { sendRequest } = useHttp();
    const [popup, setPopup] = useState(false);

    const showPopup = () => {
        setPopup(true)
    };

    const handleDelete = () => {
        let newComments = comments.filter(comm => comm.id !== comment.id);
        setComments(newComments);
    };

    const handleReport = () => {
        let popup = new Popup('Commentaire signalé');
        popup.show();
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${comment.PostId}/comment/${comment.id}/report`,
            params: {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                },
                body: JSON.stringify({ value: true })
            }
        }, () => null);
    };

    const handleNo = () => {
        setPopup(false);
    }

    const handleYes = () => {
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
        }, handleDelete);
        handleNo();
    }

    return (
        <div className="comment">
            <div className="comment__author">
                <img className="comment__authorImg" alt="" src={comment.UserId ? `${process.env.REACT_APP_IMAGE_FOLDER}/${comment.User.profilePictureUrl}` : `${process.env.REACT_APP_IMAGE_FOLDER}/defaultUser.jpg`} />
                <p className="comment__authorName">{comment.UserId ? `${comment.User.firstName} ${comment.User.lastName}` : 'Un ancien utilisateur'} le {commentDate.toString()} à {commentDate.time()} :</p>
                {(isLogged.userId === comment.UserId || isLogged.isAdmin) ? <span onClick={showPopup} className="delete noAbs"><FontAwesomeIcon icon={faTrash} /></span> : ''}
                {popup && <DeletePopup question='Voulez-vous supprimer ce commentaire ?' handleYes={handleYes} handleNo={handleNo} />}
            </div>
            <p className="comment__content">
                {comment.content}
            </p>
            <p onClick={handleReport} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faExclamationCircle} /> Signaler le commentaire</p>
        </div>
    );
};

export default Comment;