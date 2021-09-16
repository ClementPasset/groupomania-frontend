import { useContext, useEffect, useState } from 'react';
import ProfileBlock from '../../components/ProfileBlock';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../utils/context';
import Post from '../../components/Post';

const Profile = () => {

    const { isLogged } = useContext(AuthContext);
    const { sendRequest } = useHttp();
    const [userInfo, setUserInfo] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/user/${isLogged.userId}`,
            params: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': isLogged.token
                }
            }
        }, data => {
            setUserInfo(data.data);
            sendRequest({
                url: `${process.env.REACT_APP_API_URL}/post/user/${isLogged.userId}`,
                params: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': isLogged.token
                    }
                }
            }, data => {
                if (data.posts[0]) {
                    setUserPosts(data.posts)
                }
            });
        });
    }, []);

    return (
        <>
            <ProfileBlock userInfo={userInfo} />
            {userPosts.length > 0 && <section className="section">
                <h2 className="section__title">Mes posts</h2>
                {userPosts.map((post, index) => {
                    return <Post key={`postlist-${index}`} post={post} posts={userPosts} setPosts={setUserPosts} />
                })}
            </section>}
        </>
    );
};

export default Profile;