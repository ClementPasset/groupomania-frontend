import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useHttp from '../../hooks/useHttp';
import { AuthContext } from "../../utils/context";
import { faHeading, faNewspaper, faImages } from '@fortawesome/free-solid-svg-icons';
import Input from "../../utils/helpers/Input";

const Edit = () => {

    const history = useHistory();
    const handleImgChange = (e) => {
        let textInput = document.querySelector(`#imageUrl-textInput`);
        let img = document.querySelector('#postImg');
        if (e.target.files.length > 0) {
            let fileName = e.target.files[0].name;
            textInput.value = fileName;
            img.src = URL.createObjectURL(e.target.files[0]);
        } else {
            textInput.value = '';
        }
    };

    const fields = [
        {
            name: 'title',
            placeholder: 'Titre',
            type: 'text',
            icon: faHeading,
            onChange: null
        },
        {
            name: 'content',
            placeholder: 'Contenu de votre post...',
            type: 'textarea',
            icon: faNewspaper,
            onChange: null
        },
        {
            name: 'imageUrl',
            placeholder: 'Ajouter/Modifier l\'image',
            type: 'file',
            icon: faImages,
            onChange: handleImgChange
        }
    ];

    const { sendRequest } = useHttp();
    let { id } = useParams();
    const { isLogged } = useContext(AuthContext);
    const [currentPost, setCurrentPost] = useState(null);


    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${id}`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, post => setCurrentPost(post))
    }, []);

    useEffect(() => {
        if (currentPost) {
            let titleInput = document.querySelector('#title');
            let contentInput = document.querySelector('#content');

            titleInput.value = currentPost.title;
            contentInput.value = currentPost.content;
        }
    }, [currentPost])

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', document.querySelector(`#title`).value);
        formData.append('content', document.querySelector(`#content`).value);
        if (document.querySelector(`#imageUrl`).files[0]) {
            formData.append('file', document.querySelector(`#imageUrl`).files[0]);
        }
        formData.append('userId', isLogged.userId);
        formData.append('id', currentPost.id)

        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${id}`,
            params: {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': isLogged.token
                }
            }
        }, () => history.push('/'));
    };

    if (currentPost) {
        return (
            <section className="section">
                <h1 className="section__title">Modification d'un post</h1>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    {fields.map((field, index) => {
                        return new Input(field.name, field.placeholder, field.type, field.icon, index, field.onChange).toHtml();
                    })}
                    <img alt="" id="postImg" className="post__img" src={currentPost.imgURL ? `${process.env.REACT_APP_IMAGE_FOLDER}/${currentPost.imgURL}` : ''} />
                    <button className='btn' >Modifier</button>
                </form>
            </section>
        );
    } else {
        return (
            <section className="section">
                <h1 className="section__title">Erreur de récupération</h1>
                <p className="section__text">L'article n'a pas pu être récupéré</p>
            </section>
        )
    }
};

export default Edit;