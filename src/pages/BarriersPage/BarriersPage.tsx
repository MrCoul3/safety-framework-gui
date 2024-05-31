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
import { IBarrier } from "../../interfaces/IBarrier";
import EmptyBoxPage from "../../components/EmptyBoxPage/EmptyBoxPage";
import CollapseElement from "../../components/CollapseElement/CollapseElement";
import { isDevelop } from "../../constants/config";

interface IBarriersPage {}

const BarriersPage = observer((props: IBarriersPage) => {
  const { t } = useTranslation("dict");

  const { editInspectionId } = useParams();

  const { passportId } = useParams();

  const navigate = useNavigate();

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

      if (isDevelop) {
        store.barriersStore.getBarriersDev(passportId);
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
        item.Title?.includes(searchText),
      );
    }
    return [];
  };

  const barriers = () => {
    return searchText ? getFilteredBarriers() : store.barriersStore.barriers;
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
                  label={<BarrierElement data={barrier} />}
                  key={barrier.Id}
                  content={<div>conetnt</div>}
                />
              ))
            ) : (
              <div>
                <EmptyBoxPage disableActions text={"Не найдено барьеров"} />
              </div>
            )
          }
        />
      }
    />
  );
});

export default BarriersPage;
