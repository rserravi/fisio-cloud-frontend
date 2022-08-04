import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../slices/user-action";
import { fetchNewAccessJWT } from "../api/user.api";
import { loginSuccess } from "../slices/login-slice";
import LandingPage from "../pages/landing-page/landing-page";
import { user_set_locale } from "../slices/user-slice";
 
export const PrivateRoute = (children, ...rest) => {
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.login);
    
    const user = useSelector(state => state.user);
    const location = useLocation().pathname;

    useEffect(()=>{
        const udpdateAccessJWT = async() =>{
            console.log("HACIENDO UPDATEACCESSJWT")
            const result = await fetchNewAccessJWT();
            result && dispatch(loginSuccess());
        };
        
        !sessionStorage.getItem("accessJWT") && localStorage.getItem("fisioCloudSite") && udpdateAccessJWT();
        !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
        !user.id && isAuth && dispatch(getUserProfile());
        user.id && isAuth && dispatch(user_set_locale())
    
    },[dispatch, isAuth, user.id]);
    
    if (isAuth) return (
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route {...rest} element={<React.Fragment>{children.element}</React.Fragment>} path={children.path} />
        </Routes>
    )
    if (!sessionStorage.getItem("accessJWT") && !localStorage.getItem("fisioCloudSite") && location !== "/" && location !=="/signup" && location !=="/signin" && location !=="/password-reset" && location !=="/404"){
        return(
          <Navigate to= "/signin"></Navigate>
        )
      }
   
};
