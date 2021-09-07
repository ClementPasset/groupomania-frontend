import { useContext, useEffect, useState } from 'react';
import ProfileBlock from '../../components/ProfileBlock';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../utils/context';

const Profile = () => {

    const { isLogged } = useContext(AuthContext);
    const { sendRequest: getUser } = useHttp();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUser({
            url: `${process.env.REACT_APP_API_URL}/user/${isLogged.userId}`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, data => setUserInfo(data.data));
    }, []);

    return (
        <>
            <ProfileBlock userInfo={userInfo} />
            <section className="section">
                <h2 className="section__title">Mes posts</h2>
            </section>
        </>
    );
};

export default Profile;