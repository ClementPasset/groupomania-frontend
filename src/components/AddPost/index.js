import { useContext, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../../utils/context";
import Input from "../../utils/helpers/Input";

const AddPost = ({ fields, getPosts }) => {

    const [addingPost, setAddingPost] = useState(false);
    const [body, setBody] = useState(null);
    const [headers, setHeaders] = useState(null);
    const { isLogged } = useContext(AuthContext);
    const [formError, setFormError] = useState(null);
    const handleRequest = data => console.log(data);
    const { sendRequest: createPost } = useHttp({
        url: `${process.env.REACT_APP_API_URL}/post`,
        params: {
            method: 'POST',
            body: body,
            headers: headers
        }
    }, data => handleRequest);

    const handleClick = () => {
        setAddingPost(!addingPost);
    };

    const validateForm = () => {
        let title = document.querySelector('#title').value;
        let content = document.querySelector('#content').value;
        let error = null;
        if (!title || !content) {
            error = "Vérifiez que vous avez bien saisi un titre et un contenu pour votre post.";
        }
        setFormError(error);
        return error === null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            let formData = new FormData();
            formData.append('title', document.querySelector(`#title`).value);
            formData.append('content', document.querySelector(`#content`).value);
            if (document.querySelector(`#imageUrl`).files[0]) {
                formData.append('file', document.querySelector(`#imageUrl`).files[0]);
            }
            formData.append('userId', isLogged.userId);

            setBody(formData);
            setHeaders({
                'Authorization': isLogged.token
            });

            createPost();
            getPosts();
        }

    };

    return (
        <section className="section">
            <h2 className="section__title" style={{ cursor: "pointer" }} onClick={handleClick}>Ajouter un post {addingPost ? '↑' : '↓'}</h2>
            {addingPost && <form encType='multipart/form-data' onSubmit={handleSubmit}>
                {fields.map((elt, index) => {
                    let input = new Input(elt.name, elt.placeholder, elt.type, elt.icon, index);
                    return input.toHtml();
                })}
                <button type="submit" className="btn">Poster</button>
                {formError && <p>{formError}</p>}
            </form>}
        </section>
    );
};

export default AddPost;