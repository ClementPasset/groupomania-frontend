import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('fr');

const UsersTableRow = ({ user, setPopup }) => {

    const handleClick = () => {
        setPopup({ show: true, id: user.id })
    }

    return (
        <>
            <tr>
                <td><img alt="" src={`${process.env.REACT_APP_IMAGE_FOLDER}/${user.profilePictureUrl}`} /></td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{dayjs(user.lastLogin).from()}</td>
                <td><FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={handleClick} icon={faTrash} /></td>
            </tr>
        </>
    )
};

export default UsersTableRow;