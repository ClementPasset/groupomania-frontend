import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../utils/context";
import useHttp from '../../hooks/useHttp';
import UsersTable from "../../components/UsersTable";
import CommentsTable from "../../components/CommentsTable";


const Admin = () => {

    const { isLogged } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [reportedComments, setReportedComments] = useState([]);
    const { sendRequest } = useHttp();

    let history = useHistory();
    if (!isLogged.isAdmin) {
        history.push('/');
    }

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/comment/reported`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, data => setReportedComments(data.data));

        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/user`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, data => setUsers(data.data));

    }, []);

    return (
        <>
            <section className="section">
                <h2 className='section__title'>Administration</h2>
                <p className="section__text">Ici, vous pouvez gérer les commentaires qui ont été signalés par les utilisateurs ou supprimer les utilisateurs inactifs.</p>
            </section>
            {reportedComments.length > 0 && <CommentsTable reportedComments={reportedComments} setReportedComments={setReportedComments} />}
            {users.length > 0 && <UsersTable users={users} setUsers={setUsers} />}
        </>
    );
};

export default Admin;