import React from 'react';
import {observer} from "mobx-react-lite";

const DashboardPage = observer(() => {
    const url = 'https://qv/QvAJAXZfc/opendoc.htm?document=%D0%BA%D0%B0%D1%80%D0%BA%D0%B0%D1%81%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D0%B8%5C%D0%BA%D0%B0%D1%80%D0%BA%D0%B0%D1%81%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D0%B8.qvw&lang=ru-RU&host=QVS%40GPN-PROD'
    return (
        <div>
            <iframe style={{width: '100%', height: '100%'}} src={url}></iframe>
        </div>
    );
});

export default DashboardPage;