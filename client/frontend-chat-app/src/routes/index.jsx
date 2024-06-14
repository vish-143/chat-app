import React from "react"
import { privateRoute, publicRoutes } from "./app-routes"
import { Route, Routes, useNavigate } from "react-router-dom"
import Protected from "./private-route"
import { useSelector } from "react-redux"
import { useAuth } from "../hooks/useAuth"

const AppRoutes = () => {
    const navigate = useNavigate()
    const { authenticated } = useAuth();
    const isLogin = useSelector((state) => state.login);

    return (
        <React.Fragment>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Component = route.component
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                isLogin.isAuth ? navigate("/home") :
                                    <Component />
                            }
                        />
                    )
                })
                }
                {privateRoute.map((route, index) => {
                    let Component = route.component

                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Protected isLogin={authenticated || isLogin.loginResponse?.statusCode === 200}>
                                    <Component />
                                </Protected>
                            }
                        />
                    )
                })
                }
            </Routes>
        </React.Fragment>
    )
}

export default AppRoutes