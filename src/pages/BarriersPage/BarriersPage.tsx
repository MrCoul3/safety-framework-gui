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
import {
  IFormFieldTextValue,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";
import { BarrierFieldTypes } from "../../enums/BarrierTypes";

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
      ? store.barriersStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
  };

  const handleSaveInspection = () => {
    saveInspection();
    navigate(-3);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
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

  const handleAddBarrier = (countType: number, barrier: IBarrier) => {
    console.log("handleAddBarrier", countType, toJS(barrier));

    const foundBarriersById = store.barriersStore.getFoundBarriersById(
      barrier.id,
    );
    console.log("handleAddBarrier foundBarriersById", toJS(foundBarriersById));

    const value: IFilledBarrier = {
      [BarrierFieldTypes.Mub]: "",
      isActive: !foundBarriersById.length,
      barrierId: barrier.id,
      filledRequirements: null,
      title: barrier.title ?? "",
    };

    if (countType === 1) {
      store.barriersStore.addFilledBarriers(value);
      // "+"
    }
    if (countType === 0) {
      store.barriersStore.removeFilledBarriers(value.barrierId);
      // "-"
    }
  };

  const [isFormsValidForSending, setIsFormsValidForSending] = useState(false);

  const handleChange = (value: IFormFieldTextValue, barrierId: number) => {
    console.log("handleChange", value, barrierId);
    setSavingState(true);
    store.barriersStore.changeFormFieldsValues(value, barrierId);
    // store.freeFormStore.updateFormFieldsValues(value, index);
    // const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    // console.log("handleSendInspection isValid", isValid);
    // setIsFormsValidForSending(isValid);
  };

  const getBarriersById = (barrierId: number) => {
    return store.barriersStore.filledBarriers.filter(
      (item) => item.barrierId === barrierId,
    );
  };
  const getActiveBarrierById = (barrierId: number) => {
    const filteredBarriers = getBarriersById(barrierId);
    if (filteredBarriers && filteredBarriers.length) {
      const activeBarrier = filteredBarriers.find(
        (barrier) => barrier.isActive,
      );
      if (activeBarrier) {
        return activeBarrier;
      }
      return filteredBarriers[0];
    }
  };
  const handleBarrierInPanelClick = (barrierId: number, index: number) => {
    store.barriersStore.setIsActiveParamToBarrier(barrierId, index);
  };

  return (
    <Layout
      navPanel={
        <NavPanel
          disableSaveButton={!savingState}
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
                      barriersLength={getBarriersById(barrier.id)?.length}
                      handleCounterClick={(countType) =>
                        handleAddBarrier(countType, barrier)
                      }
                      title={barrier.title}
                    />
                  }
                  key={barrier.id}
                  content={
                    <>
                      <BarriersPanel
                        onItemClick={handleBarrierInPanelClick}
                        barriers={getBarriersById(barrier.id)}
                      />

                      <BarrierForm
                        formFields={getActiveBarrierById(barrier.id)}
                        handleChange={(value: IFormFieldTextValue) =>
                          handleChange(value, barrier.id)
                        }
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
