import Post from "../pages/Post";
import Admin from "../pages/Admin";
import Edit from "../pages/Edit";
import ErrorRoute from "../pages/ErrorRoute";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const routes = [
    {
        path: "/signup",
        exact: true,
        Component: Signup
    },
    {
        path: "/signin",
        exact: true,
        Component: Signin
    },
    {
        path: "/admin",
        exact: true,
        Component: Admin
    },
    {
        path: "/profile",
        exact: true,
        Component: Profile
    },
    {
        path: "/",
        exact: true,
        Component: Landing
    },
    {
        path: "/post/:postId",
        exact: false,
        Component: Post
    },
    {
        path: "/edit/:id",
        exact: false,
        Component: Edit
    },
    {
        path: "",
        exact: false,
        Component: ErrorRoute
    }
];

export default routes;