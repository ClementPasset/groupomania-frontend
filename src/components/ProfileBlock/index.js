import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ProfileBlock = ({ userInfo }) => {

    const [profileChanged, setProfileChanged] = useState(false);

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