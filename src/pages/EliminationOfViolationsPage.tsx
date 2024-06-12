import React from "react";
import { observer } from "mobx-react-lite";
import Layout from "../layouts/Layout/Layout";
import NavPanel from "../components/NavPanel/NavPanel";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";

interface IEliminationOfViolationsPage {}

const EliminationOfViolationsPage = observer(
  (props: IEliminationOfViolationsPage) => {
    const { t } = useTranslation("dict");

    const crumbs: IBreadCrumbs[] = [
      {
        label: t("mainPage"),
        index: -1,
        href: "#",
        path: "main",
      },
      {
        label: t("eliminationOfViolationsTitle"),
      },
    ];
    return (
      <Layout
        navPanel={
          <NavPanel
            disableButtons
            isDisableSaveInspectionButton
            crumbs={crumbs}
            title={t("eliminationOfViolationsTitle")}
          />
        }
        content={<div>content</div>}
      />
    );
  },
);

export default EliminationOfViolationsPage;
