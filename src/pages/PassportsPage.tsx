import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import PassportElement from "../components/PassportElement/PassportElement";
import NavPanel from "../components/NavPanel/NavPanel";
import { useTranslation } from "react-i18next";
import PassportsList from "../components/PassportsList/PassportsList";
import { RoutesTypes } from "../enums/RoutesTypes";
import {useLocation, useNavigate, useParams} from "react-router";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import Layout from "../layouts/Layout/Layout";

interface IPassportsPage {}

const PassportsPage = observer((props: IPassportsPage) => {
  const { t } = useTranslation("dict");

  let { editInspectionId } = useParams();

  let { passportId } = useParams();

  const store = useStore();

  const navigate = useNavigate();

  const init = () => {
    store.passportsStore.getPassportsDev();
    // store.passportsStore.getPassports()
  };

  useEffect(() => {
    init();
  }, []);

  const handlePassportClick = (id: number) => {
    navigate(RoutesTypes.Barriers + `/${id}`);
  };

  const crumbs: IBreadCrumbs[] = [
    {
      label: t("mainPage"),
      index: -2,
      href: "#",
    },
    {
      label: t("inspectionData"),
      index: -1,
      href: "#",
    },
    {
      label: t("passports"),
    },
  ];
  const saveInspection = () => {
    editInspectionId
        ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
        : store.inspectionStore.setInspectionToLocalStorage();
  };

  const handleSaveInspection = () => {
    saveInspection();
    navigate(-2);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
  };

  return (
    <Layout
      navPanel={
        <NavPanel
          crumbs={crumbs}
          // disableSaveButton={!savingState}
          // handleEditPassports={handleEditPassports}
          handleSaveInspection={handleSaveInspection}
          title={t("selectPassport")}
          description={t("selectPassportDescription")}
        />
      }
      content={
        <PassportsList
          content={store.passportsStore.passports
            .filter((passport) => passport.code)
            .map((passport) => (
              <PassportElement
                onClick={handlePassportClick}
                key={passport.id}
                data={passport}
              />
            ))}
        />
      }
    />
  );
});

export default PassportsPage;
