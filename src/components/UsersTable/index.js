import UsersTableRow from "../UsersTableRow";
import DeletePopup from '../DeletePopup';
import { useContext, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../../utils/context";

const UsersTable = ({ users, setUsers }) => {
    const { isLogged } = useContext(AuthContext);
    const [popup, setPopup] = useState({ show: false, id: null });
    const { sendRequest } = useHttp();

    const handleYes = () => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/user/${popup.id}`,
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
            let newUsers = users.filter(user => user.id !== popup.id);
            setUsers(newUsers);
        });
        handleNo();
    };

    const handleNo = () => {
        setPopup({ show: false, id: null })
    };

    return (
        <section className="section">
            {popup.show && <DeletePopup question="Voulez-vous supprimer l'utilisateur ?" handleYes={handleYes} handleNo={handleNo} />}
            <h2 className="section__title">Liste des utilisateurs</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Photo de profil</th>
                        <th>Utilisateur</th>
                        <th>Dernière connexion</th>
                        <th>Supprimer l'utilisateur</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return <UsersTableRow key={`userLine-${index}`} user={user} setPopup={setPopup} />;
                    })}
                </tbody>
            </table>
        </section>
    )
};

export default UsersTable;