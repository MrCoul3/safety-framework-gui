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
import { IInspection } from "../../interfaces/IInspection";
import AddBarrierButton from "../../components/AddBarrierButton/AddBarrierButton";

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

  const loadInspection = () => {
    if (editInspectionId) {
      store.inspectionStore.loadInspection(editInspectionId);
    }
  };

  const getFilledBarriersFromFieldsData = () => {
    const filledBarriers = (
      store.inspectionStore.formFieldsValues as IInspection
    )["filledBarriers"];
    if (filledBarriers) {
      store.barriersStore.setFilledBarriers(filledBarriers);
    }
  };

  const init = async () => {
    if (!Object.keys(store.inspectionStore.formFieldsValues).length) {
      await loadInspection();
    }
    getFilledBarriersFromFieldsData();
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

  const handleAddBarrier = (barrier: IBarrier) => {
    console.log("handleAddBarrier", toJS(barrier));
    setSavingState(true);

    const foundBarriersById = store.barriersStore.getFoundBarriersById(
      barrier.id,
    );
    console.log("handleAddBarrier foundBarriersById", toJS(foundBarriersById));

    const value: IFilledBarrier = {
      [BarrierFieldTypes.Mub]: "",
      barrierId: barrier.id,
      // passportId: barrier.passportId,
      filledRequirements: null,
      title: barrier.title ?? "",
    };
    store.barriersStore.addFilledBarriers(value);

  };

  const [isFormsValidForSending, setIsFormsValidForSending] = useState(false);

  const handleChange = (value: IFormFieldTextValue, barrierId: number, index: number) => {
    console.log("handleChange", value, barrierId);
    setSavingState(true);
    store.barriersStore.changeFormFieldsValues(value, barrierId, index);
    // store.freeFormStore.updateFormFieldsValues(value, index);
    // const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    // console.log("handleSendInspection isValid", isValid);
    // setIsFormsValidForSending(isValid);
  };

  const getFilledBarriersById = (barrierId: number) => {
    return store.barriersStore.filledBarriers.filter(
      (item) => item.barrierId === barrierId,
    );
  };

  const handleDeleteBarrier = (barrierId: number, index: number) => {
    store.barriersStore.deleteFilledBarrier(barrierId, index)
    setSavingState(true);
  };

  const handleClearForm = (barrierId: number, index: number) => {
    store.barriersStore.clearFilledBarrier(barrierId, index)
    setSavingState(true);
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
                      barriersLength={getFilledBarriersById(barrier.id)?.length}
                      title={barrier.title}
                    />
                  }
                  key={barrier.id}
                  content={
                    <>
                      <BarriersPanel
                        filledBarriers={getFilledBarriersById(barrier.id)}
                        renderForm={(index: number) => (
                          <BarrierForm barrier={barrier} handleClearForm={() => handleClearForm(barrier.id, index)}
                            handleDelete={() => handleDeleteBarrier(barrier.id, index)}
                            formFields={getFilledBarriersById(barrier.id)[index]}
                            handleChange={(value: IFormFieldTextValue) =>
                              handleChange(value, barrier.id, index)
                            }
                            isValidate={store.inspectionStore.isValidate}
                          />
                        )}
                      />

                      <AddBarrierButton
                        onClick={() => handleAddBarrier(barrier)}
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
