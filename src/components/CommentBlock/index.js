import Comment from "../Comment";

const CommentBlock = ({ comments }) => {

    return (
        <section className="section">
            <h2 className="section__title">Commentaires</h2>
            {comments.map((comment, index) => <Comment key={`comment-${index}`} comment={comment} />)}
        </section>
    );
};

export default CommentBlock;