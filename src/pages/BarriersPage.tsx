import React from 'react';
import {observer} from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import Layout from "../layouts/Layout/Layout";
import {useStore} from "../hooks/useStore";
import {useNavigate} from "react-router";
import {IBreadCrumbs} from "../interfaces/IBreadCrumbs";
import {useTranslation} from "react-i18next";

interface IBarriersPage {

}

const BarriersPage = observer((props: IBarriersPage) => {
    const { t } = useTranslation("dict");

    const store = useStore();

    const navigate = useNavigate();

    const crumbs: IBreadCrumbs[] = [
        {
            label: t("mainPage"),
            href: "#",
            index: -3,
        },
        {
            label: t("inspectionData"),
            href: "#",
            index: -2,
        },
        {
            label: t("passports"),
            href: "#",
            index: -1,
        },
        {
            label: t("completionBarrier"),
        },
    ];
    return (
        <Layout
            navPanel={
                <NavPanel
                    crumbs={crumbs}
                    // disableSaveButton={!savingState}
                    // handleEditPassports={handleEditPassports}
                    // handleSaveInspection={handleSaveInspection}
                    title={t("completionBarrier")}
                    description={t("completionBarrierDescription")}
                />
            }
            content={
              <></>
            }
        />
    );
});

export default BarriersPage;