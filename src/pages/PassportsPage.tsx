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
    if (!store.passportsStore.passports.length) {
      if (isDevelop) {
        store.passportsStore.getPassportsDev();
        store.passportsStore.getPassports();
      } else {
        store.passportsStore.getPassports();
      }
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
    if (
      location.pathname.includes(RoutesTypes.EditLocalInspection) &&
      editInspectionId
    ) {
      store.inspectionStore.updateInspectionToLocalStorage(editInspectionId);
    }
    if (location.pathname.includes(RoutesTypes.NewInspection)) {
      store.inspectionStore.setInspectionToLocalStorage();
    }
    if (location.pathname.includes(RoutesTypes.EditInspection)) {
      store.inspectionStore.setInspectionToLocalStorage();
    }
    store.inspectionStore.setIsValidate(false);
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

  const getFilledBarriersForPassport = (passportId: string) => {
    const passportById = store.passportsStore.passports.find(
      (pass) => pass.id === passportId,
    );
    console.log(
      "getFilledBarriersForPassport passportById",
      toJS(passportById),
    );
    const passportBarriers = passportById?.["barriers"];
    if (filledBarriers && filledBarriers.length) {
      const filledBarriersByPassId = filledBarriers.filter((fillBar) => {
        const fillBarId = fillBar.barrierId.toString();
        const passBarId = passportBarriers?.find((passBar) => {
          const passId = passBar.id.toString();
          const fillBarId = fillBar.barrierId.toString();
          return passId === fillBarId;
        })?.id;
        return fillBarId === passBarId?.toString();
      });
      return filledBarriersByPassId;
    }
  };

  const getBarriersCount = (passportId: string) => {
    const filledBarriersByPassId = getFilledBarriersForPassport(passportId);
    console.log(
      "getBarriersCount filledBarriersByPassId",
      toJS(filledBarriersByPassId),
    );
    return filledBarriersByPassId?.length ? filledBarriersByPassId.length : 0;
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
          disableSaveButton={!store.inspectionStore.savingState}
          crumbs={crumbs}
          handleSaveInspection={handleSaveInspection}
          title={t("selectPassport")}
          description={t("selectPassportDescription")}
        />
      }
      content={
        <PassportsList
          isPassportLength={!!store.passportsStore.passports.length}
          loader={store.loaderStore.loader}
          content={store.passportsStore.passports
            .filter((passport) => passport.code)
            .map((passport) => (
              <PassportElement
                isValid={store.barriersStore.checkIsBarrierFormSuccessForPassport(
                  getFilledBarriersForPassport(passport.id),
                  passport.id,
                )}
                id={passport.id}
                key={passport.id}
                title={passport.title}
                onClick={handlePassportClick}
                icon={passport?.icon?.iconString}
                barriersCount={getBarriersCount(passport.id)}
              />
            ))}
        />
      }
    />
  );
});

export default PassportsPage;
