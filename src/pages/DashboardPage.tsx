import React from 'react';
import {observer} from "mobx-react-lite";
import {DASHBOARD_URL} from "../constants/constants";

const DashboardPage = observer(() => {
    const url = DASHBOARD_URL;
    return (
        <div>
            <iframe style={{width: '100%', height: '100%'}} src={url}></iframe>
        </div>
    );
});

export default DashboardPage;