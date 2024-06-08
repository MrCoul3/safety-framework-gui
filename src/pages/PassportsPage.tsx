import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import PassportElement from "../components/PassportElement/PassportElement";
import NavPanel from "../components/NavPanel/NavPanel";
import { useTranslation } from "react-i18next";
import PassportsList from "../components/PassportsList/PassportsList";
import { RoutesTypes } from "../enums/RoutesTypes";
import { useNavigate, useParams } from "react-router";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import Layout from "../layouts/Layout/Layout";
import { Button } from "@consta/uikit/Button";
import { isDevelop } from "../constants/config";
import { toJS } from "mobx";
import { IInspection } from "../interfaces/IInspection";

interface IPassportsPage {}

const PassportsPage = observer((props: IPassportsPage) => {
  const { t } = useTranslation("dict");

  let { editInspectionId } = useParams();

  const store = useStore();

  const navigate = useNavigate();

  const loadInspection = async () => {
    console.log("PassportsPage loadInspection");
    if (editInspectionId) {
      await store.inspectionStore.loadInspection(editInspectionId);
    }
  };

  const getFilledBarriersFromFieldsData = () => {
    const filledBarriers = (
      store.inspectionStore.formFieldsValues as IInspection
    )["filledBarriers"];
    console.log(
      "getFilledBarriersFromFieldsData filledBarriers",
      toJS(filledBarriers),
    );
    if (filledBarriers) {
      store.barriersStore.setFilledBarriers(filledBarriers);
    }
  };

  const init = async () => {
    if (!Object.keys(store.inspectionStore.formFieldsValues).length) {
      await loadInspection();
    }
    getFilledBarriersFromFieldsData();

    if (isDevelop) {
      store.passportsStore.getPassportsDev();
      store.passportsStore.getPassports();
    } else {
      store.passportsStore.getPassports();
    }
  };

  const filledBarriers = (
    store.inspectionStore.formFieldsValues as IInspection
  )["filledBarriers"];

  useEffect(() => {
    init();
    console.log(
      "passport page formFieldsValues",
      toJS(store.inspectionStore.formFieldsValues),
    );
    console.log("passport page filledBarriers", toJS(filledBarriers));
  }, []);

  const handlePassportClick = (id: string) => {
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

  const getBarriersCount = (passportId: string) => {
    console.log("getBarriersCount filledBarriers", toJS(filledBarriers)); // [{barrierId: }]
    const passportById = store.passportsStore.passports.find(
      (pass) => pass.id === passportId,
    );
    const passportBarriers = passportById?.["barriers"];
    console.log("getBarriersCount passportById", toJS(passportById));
    console.log("getBarriersCount passportBarriers", toJS(passportBarriers));
    if (filledBarriers && filledBarriers.length) {
      const filledBarriersByPassId = filledBarriers.filter(
          (fillBar) =>
              fillBar.barrierId ===
              passportBarriers?.find((passBar) => passBar.id === fillBar.barrierId)
                  ?.id,
      );
      console.log("getBarriersCount filledBarriersByPassId", toJS(filledBarriersByPassId.length));
      return filledBarriersByPassId.length
    }
    return 0;
  };

  return (
    <Layout
      navPanel={
        <NavPanel
          actions={
            <Button
              onClick={() => navigate(-1)}
              label={t("toInspectionForm")}
              view={"secondary"}
            />
          }
          crumbs={crumbs}
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
                barriersCount={getBarriersCount(passport.id)}
                id={passport.id}
                code={passport.code}
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
