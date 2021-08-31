import { useParams } from "react-router-dom";

const Post = () => {

    const { postId } = useParams();
    console.log(postId)

    return (
        <>
        </>
    );
};

export default Post;