import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../utils/context/index';
import useHttp from '../../hooks/useHttp';

const ProfileBlock = ({ userInfo }) => {

    const [profileChanged, setProfileChanged] = useState(false);
    const { isLogged, dispatchIsLogged } = useContext(AuthContext);
    const history = useHistory();
    const { sendRequest } = useHttp();

    const handleClick = () => {
        let input = document.querySelector('#profilePictureInput');
        input.click();
    };
    const handleChange = (e) => {
        let picture = document.querySelector('#profilePicture');
        if (e.target.files) {
            picture.src = URL.createObjectURL(e.target.files[0])
            setProfileChanged(true);
        }
    };
    const handleDelete = () => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/user/${userInfo.id}`,
            params: {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                },
                body: JSON.stringify({ userId: isLogged.userId, action: 'deleteUser' })
            }
        }, () => {
            dispatchIsLogged({ type: 'LOGOUT' });
            history.push('/');
        });
    };
    const handleUpdate = () => {

    };

    if (userInfo) {
        return (
            <section className="section profile">
                <h2 className="section__title">Mon profil</h2>
                <div className="profile__pictureWrapper">
                    <img id="profilePicture" className="profile__picture" alt={`Profil de ${userInfo.firstName + ' ' + userInfo.lastName}`} src={`${process.env.REACT_APP_IMAGE_FOLDER}/${userInfo.profilePictureUrl}`} />
                    <div onClick={handleClick} className="profile__afterPicture">Modifier la photo</div>
                    <input onChange={handleChange} type="file" id="profilePictureInput" name="profilePicture" className="fileInput" />
                </div>
                <h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
                <p onClick={handleDelete} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faExclamationTriangle} /> Supprimer mon compte</p>
                {profileChanged && <button onClick={handleUpdate} className="btn">Valider les changements</button>}
            </section>
        );
    } else {
        return <></>;
    }
};

export default ProfileBlock;