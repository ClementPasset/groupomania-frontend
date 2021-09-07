import DateFormat from "../../utils/helpers/DateFormat";

const Comment = ({ comment }) => {
    let commentDate = new DateFormat(comment.createdAt);
    return (
        <div className="comment">
            <div className="comment__author">
                <img className="comment__authorImg" alt="" src={comment.UserId ? `${process.env.REACT_APP_IMAGE_FOLDER}/${comment.User.profilePictureUrl}` : `${process.env.REACT_APP_IMAGE_FOLDER}/defaultUser.jpg`} />
                <p className="comment__authorName">{comment.UserId ? `${comment.User.firstName} ${comment.User.lastName}` : 'Un ancien utilisateur'} le {commentDate.toString()} à {commentDate.time()} :</p>
            </div>
            <div className="comment__content">
                {comment.content}
            </div>
        </div>
    );
};

export default Comment;