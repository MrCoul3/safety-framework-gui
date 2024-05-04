import React from "react";
import { observer } from "mobx-react-lite";
import NewInspectionPageLayout from "../layouts/NewInspectionPageLayout/NewInspectionPageLayout";
import NavPanel from "../components/NavPanel/NavPanel";
import InspectionForm from "../components/InspectionForm/InspectionForm";
import { useTranslation } from "react-i18next";

interface INewInspectionPage {}

const NewInspectionPage = observer((props: INewInspectionPage) => {
  const { t } = useTranslation("dict");

  return (
    <NewInspectionPageLayout
      navPanel={
        <NavPanel
          actionText={t("createInspection")}
          description={t("addInspectionDescription")}
          title={t("addInspectionTitle")}
        />
      }
      content={<InspectionForm />}
    />
  );
});

export default NewInspectionPage;
