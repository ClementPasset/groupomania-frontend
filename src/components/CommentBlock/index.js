import Comment from "../Comment";

const CommentBlock = ({ comments, setComments }) => {

    return (
        <section className="section">
            <h2 className="section__title">Commentaires</h2>
            {comments.map((comment, index) => <Comment key={`comment-${index}`} comment={comment} setComments={setComments} comments={comments} />)}
        </section>
    );
};

export default CommentBlock;