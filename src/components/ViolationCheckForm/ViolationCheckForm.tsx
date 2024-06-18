import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Card } from "@consta/uikit/Card";
import { useTranslation } from "react-i18next";
import { FilledQuestionTypes } from "../../enums/FilledQuestionTypes";
import { TextField } from "@consta/uikit/TextField";
import { DragNDropField } from "@consta/uikit/DragNDropField";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { IconAttach } from "@consta/icons/IconAttach";

interface IViolationCheckForm {}

const ViolationCheckForm = observer((props: IViolationCheckForm) => {
  const { t } = useTranslation("dict");

  const handleChange = (value: string | null) => {
    console.log("QuestionCard handleChange value", value);
  };

  return (
    <div className={style.ViolationCheckForm}>
      <Card className={style.card}>
        <div className={style.title}>{t("checkForm")}</div>
        <TextField
          required
          minRows={3}
          cols={200}
          onChange={handleChange}
          value={""}
          label={t(FilledQuestionTypes.Comment)}
          type="textarea"
          placeholder={t(FilledQuestionTypes.Comment)}
        />
        <div className={style.DragNDropField}>
          <div className={style.label}>
            {t("app")}
            <span style={{ color: "red" }}> *</span>
          </div>
          <DragNDropField
            multiple
            maxSize={20 * 1024 * 1024}
            onDropFiles={() => {}}
          >
            {({ openFileDialog }) => (
              <>
                <div className={style.flexCol}>
                  <Text className={style.fileFormTitle}>
                    {t("fileFormTitle")}
                  </Text>
                  <Text className={style.fileFormDescription} size={"s"}>
                    {t("maxFileSizeDescription")}
                  </Text>
                </div>
                <br />
                <Button
                  view={"ghost"}
                  iconLeft={IconAttach}
                  onClick={openFileDialog}
                  label={t("uploadFile")}
                />
              </>
            )}
          </DragNDropField>
        </div>
      </Card>
    </div>
  );
});

export default ViolationCheckForm;
