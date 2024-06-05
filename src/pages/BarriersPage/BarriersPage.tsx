import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../../components/NavPanel/NavPanel";
import Layout from "../../layouts/Layout/Layout";
import { useStore } from "../../hooks/useStore";
import { useNavigate, useParams } from "react-router";
import { IBreadCrumbs } from "../../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import BarriersList from "../../components/BarriersList/BarriersList";
import BarrierElement from "../../components/BarrierElement/BarrierElement";
import { Button } from "@consta/uikit/Button";
import Search from "../../components/Search/Search";
import { CheckEntityTypes } from "../../enums/CheckEntityTypes";
import EmptyBoxPage from "../../components/EmptyBoxPage/EmptyBoxPage";
import CollapseElement from "../../components/CollapseElement/CollapseElement";
import { isDevelop } from "../../constants/config";
import { toJS } from "mobx";
import { IBarrier } from "../../interfaces/IBarrier";
import BarrierForm from "../../components/BarrierForm/BarrierForm";
import BarriersPanel from "../../components/BarriersPanel/BarriersPanel";
import { IFormFieldValue } from "../../interfaces/IFieldInterfaces";

interface IBarriersPage {}

const BarriersPage = observer((props: IBarriersPage) => {
  const { t } = useTranslation("dict");

  const { editInspectionId } = useParams();

  const { passportId } = useParams();

  const navigate = useNavigate();

  const store = useStore();

  const [savingState, setSavingState] = useState(false);

  const passport = useMemo(
    () =>
      store.passportsStore.passports.find(
        (pass) => pass.id.toString() === passportId,
      ),
    [passportId],
  );

  const init = () => {
    console.log("passportId", passportId);
    if (passportId) {
      console.log("passport", toJS(passport));

      if (isDevelop) {
        store.barriersStore.getBarriersDev();
        store.barriersStore.getBarriers(passportId);
      } else {
        store.barriersStore.getBarriers(passportId);
      }
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

  const [searchText, setSearchText] = useState<string | null>(null);
  const handleSearch = (value: string | null) => {
    setSearchText(value);
  };

  const getFilteredBarriers = () => {
    if (searchText) {
      return store.barriersStore.barriers.filter((item) =>
        item.title?.includes(searchText),
      );
    }
    return [];
  };

  const barriers = () => {
    return searchText ? getFilteredBarriers() : store.barriersStore.barriers;
  };

  const handleCounterClick = (countType: number, barrier: IBarrier) => {
    console.log("handleCounterClick", countType, toJS(barrier));

    if (countType === 1) {
      // "+"
    }
    if (countType === 0) {
      // "-"
    }
  };

  const [isFormsValidForSending, setIsFormsValidForSending] = useState(false);

  const handleChange = (value: IBarrier) => {
    console.log("handleChange", value);
    setSavingState(true);
    // store.freeFormStore.updateFormFieldsValues(value, index);
    // const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    // console.log("handleSendInspection isValid", isValid);
    // setIsFormsValidForSending(isValid);
  };

  return (
    <Layout
      navPanel={
        <NavPanel
          actions={
            <Button
              onClick={() => navigate(-1)}
              label={t("toPassports")}
              view={"secondary"}
            />
          }
          crumbs={crumbs}
          handleSaveInspection={handleSaveInspection}
          title={`${t("completionBarrier")} ${passport?.code ?? ""}`}
          description={t("completionBarrierDescription")}
        />
      }
      content={
        <BarriersList
          search={
            <Search
              handleSearch={handleSearch}
              label={`${t(CheckEntityTypes.Barriers)} ${passport?.code ?? ""}`}
            />
          }
          content={
            barriers().length ? (
              barriers().map((barrier) => (
                <CollapseElement
                  label={
                    <BarrierElement
                      handleCounterClick={(countType) =>
                        handleCounterClick(countType, barrier)
                      }
                      title={barrier.title}
                    />
                  }
                  key={barrier.id}
                  content={
                    <>
                      <BarriersPanel />
                      <BarrierForm
                        handleChange={(value: IBarrier) => handleChange(value)}
                        isValidate={store.inspectionStore.isValidate}
                      />
                    </>
                  }
                />
              ))
            ) : (
              <div>
                <EmptyBoxPage disableActions text={t("noBarriers")} />
              </div>
            )
          }
        />
      }
    />
  );
});

export default BarriersPage;
