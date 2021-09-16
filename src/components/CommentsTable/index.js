
import { useContext, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../../utils/context";
import CommentsTableRow from "../CommentsTableRow";
import DeletePopup from "../DeletePopup";


const CommentsTable = ({ reportedComments, setReportedComments }) => {
    const [popup, setPopup] = useState({ show: false, commId: null, postId: null });
    const { isLogged } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    const handleYes = () => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/post/${popup.postId}/comment/${popup.commId}`,
            params: {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                },
                body: JSON.stringify({ userId: isLogged.userId })
            }
        }, () => {
            let newReportedComments = reportedComments.filter(comm => comm.id !== popup.commId);
            setReportedComments(newReportedComments);
        });
        handleNo();
    };

    const handleNo = () => {
        setPopup({ show: false, commId: null, postId: null })
    };

    return (
        <section className="section">
            {popup.show && <DeletePopup question="Voulez-vous supprimer le commentaire ?" handleNo={handleNo} handleYes={handleYes} />}
            <h2 className="section__title">Commentaires signalés</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Commentaire</th>
                        <th>Auteur</th>
                        <th>Annuler le signalement</th>
                        <th>Supprimer le commentaire</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedComments.map((comm, index) => {
                        return <CommentsTableRow reportedComments={reportedComments} setReportedComments={setReportedComments} key={`commentLine-${index}`} comm={comm} setPopup={setPopup} />;
                    })}
                </tbody>
            </table>
        </section>
    )
};

export default CommentsTable;