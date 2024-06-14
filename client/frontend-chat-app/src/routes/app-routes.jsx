import { lazy } from "react";

export const publicRoutes = [
    {
        id: 1,
        name: "Register",
        path: "/",
        component: lazy(() => import("@container/auth/register")),
    },
    {
        id: 2,
        name: "Login",
        path: "/login",
        component: lazy(() => import("@container/auth/login")),
    },
    {
        id: 3,
        name: "Not Found",
        path: "*",
        component: lazy(() => import("@container/not-found")),
    },
]

export const privateRoute = [
    {
        id: 4,
        name: "Home",
        path: "/home",
        component: lazy(() => import("@container/home")),
    }
]