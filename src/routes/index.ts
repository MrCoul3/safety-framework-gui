import {IBrowserRoute} from "../interfaces/common/IBrowserRoute";
import {MainPage} from "../pages";

export const routes: IBrowserRoute[] = [
    {
        path: "/",
        component: MainPage,
        exact: true,
    },
    {
        path: "/:id",
        component: MainPage,
        exact: true,
    },
];
