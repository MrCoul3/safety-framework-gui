import React, { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../../components/NavPanel/NavPanel";
import Layout from "../../layouts/Layout/Layout";
import { useStore } from "../../hooks/useStore";
import {  useParams } from "react-router";
import { IBreadCrumbs } from "../../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import BarriersList from "../../components/BarriersList/BarriersList";
import BarrierElement from "../../components/BarrierElement/BarrierElement";

interface IBarriersPage {}

const BarriersPage = observer((props: IBarriersPage) => {
  const { t } = useTranslation("dict");

  let { editInspectionId } = useParams();

  let { passportId } = useParams();

  const store = useStore();

  const passport = useMemo(
    () =>
      store.passportsStore.passports.find(
        (pass) => pass.id.toString() === passportId,
      ),
    [passportId],
  );

  const init = () => {
    if (passportId) {
      console.log("passport", passport);
      store.barriersStore.getBarriersDev(passportId);
      // store.barriersStore.getBarriers(passportId)
    }
  };

  useEffect(() => {
    init();
  }, []);

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
      label: `${t("completionBarrier")} ${passport?.code ?? ""}`,
    },
  ];

  const saveInspection = () => {
    editInspectionId
      ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
  };

  const handleSaveInspection = () => {
    /* saveInspection();
    navigate(-3);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });*/
  };
  const handleCollapseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Layout
      navPanel={
        <NavPanel
          crumbs={crumbs}
          // disableSaveButton={!savingState}
          // handleEditPassports={handleEditPassports}
          handleSaveInspection={handleSaveInspection}
          title={`${t("completionBarrier")} ${passport?.code ?? ""}`}
          description={t("completionBarrierDescription")}
        />
      }
      content={
        <BarriersList
          content={store.barriersStore.barriers.map((barrier) => (
            <BarrierElement
              content={<div>conetnt</div>}
              // onClick={handleBarrierClick}
              key={barrier.Id}
              data={barrier}
            />
          ))}
        />
      }
    />
  );
});

export default BarriersPage;
