import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import Home from "./views/Home/Home";
import testimonials from "./views/Testimonials/Testimonials";
import NotFound from "./views/NotFound";
import Payments from "./views/Payments/Payments";
import Services from "./views/Services/Services";

const routes = [
    {
        exact: true,
        path: "/",
        component: Home,
    },
    {
        exact: false,
        path: "/services",
        component: Services,
    },
    {
        exact: false,
        path: "/book",
        component: Home,
    },
    {
        exact: false,
        path: "/payments",
        component: Payments,
    },
    {
        exact: false,
        path: "/testimonials",
        component: testimonials,
    },
];

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                {routes.map(r => (
                    <Route
                        key={r.path}
                        exact={!!r.exact}
                        path={r.path}
                        component={r.component}
                    />
                ))}
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default App;
