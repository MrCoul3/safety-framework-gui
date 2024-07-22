import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";

interface INothingFound {
  info?: string;
}

const NothingFound = observer((props: INothingFound) => {
  return (
    <ResponsesNothingFound
      className={style.ResponsesNothingFound}
      title={props.info}
      description={" "}
      actions={" "}
    />
  );
});

export default NothingFound;
