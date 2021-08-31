import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../utils/context";

const Admin = () => {

    const { isLogged } = useContext(AuthContext);

    let history = useHistory();
    if (!isLogged.isAdmin) {
        history.push('/');
    }

    return (
        <section className="section">
            <h2 className='section__title'>Administration</h2>
        </section>
    );
};

export default Admin;