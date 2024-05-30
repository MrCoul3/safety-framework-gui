import React, { ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";
import { Collapse } from "@consta/uikit/Collapse";

interface ICollapseElement {
  content?: ReactNode;
  label?: ReactNode;
}

const CollapseElement = observer((props: ICollapseElement) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.closest(".button")) {
      e.preventDefault();
      return;
    }
    setOpen(!isOpen);
  };

  return (
    <Collapse
      iconView="ghost"
      iconPosition={"right"}
      isOpen={isOpen}
      onClick={onClick}
      label={props.label}
    >
      {props.content}
    </Collapse>
  );
});

export default CollapseElement;
