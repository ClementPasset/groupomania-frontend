import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import useHttp from "../../hooks/useHttp";

const CommentsTableRow = ({ comm, setPopup, reportedComments, setReportedComments }) => {
    const { isLogged } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    const handleClick = () => {
        setPopup({ show: true, commId: comm.id, postId: comm.PostId })
    };

    const handleRemoveReport = () => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${comm.PostId}/comment/${comm.id}/report`,
            params: {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                },
                body: JSON.stringify({ value: false })
            }
        }, () => {
            let newReportedComments = reportedComments.filter(comment => comment.id !== comm.id);
            setReportedComments(newReportedComments);
        });
    };

    return (
        <tr>
            <td>{comm.content}</td>
            {comm.User && <td>{`${comm.User.firstName} ${comm.User.lastName}`}</td>}
            {!comm.User && <td>Un ancien utilisateur</td>}
            <td><FontAwesomeIcon onClick={handleRemoveReport} style={{ cursor: 'pointer' }} icon={faUndo} /></td>
            <td><FontAwesomeIcon onClick={handleClick} style={{ cursor: 'pointer' }} icon={faTrash} /></td>
        </tr>
    )
};

export default CommentsTableRow;