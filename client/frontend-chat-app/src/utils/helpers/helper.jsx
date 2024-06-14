// Redux helper for create action
export const ActionCreator = (ActionType, Payload) => {
    return { type: ActionType, payload: Payload ?? undefined };
};

const setAuth = (data) => {
    localStorage.setItem("isAuth", data.isAuth);
    localStorage.setItem("token", data.token);
};

const getAuth = () => {
    return {
        isAuth: localStorage.getItem("isAuth"),
        token: localStorage.getItem("token"),
    };
};

const clearAuth = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
};


export { setAuth, getAuth, clearAuth };