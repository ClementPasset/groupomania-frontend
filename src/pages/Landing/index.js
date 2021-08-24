import { useContext } from "react";
import { AuthContext } from "../../utils/context";

const Landing = () => {

    const { isLogged } = useContext(AuthContext);

    return (
        !isLogged.logged ? <section className="section">
            <h2 className="section__title">Groupomania</h2>
            <p className="section__text">
                Bienvenue sur le réseau de Groupomania.<br />
                Ici, n'hésitez pas à partager avec vos collègues pour apprendre à mieux vous connaître !<br />
                Inscrivez-vous pour commencer à échanger !
            </p>
        </section> :
            <section className="section">
                <h2 className="section__title">Contenu du site</h2>
            </section>
    );
};

export default Landing;