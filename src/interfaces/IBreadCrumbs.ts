import { IconComponent } from "@consta/icons/Icon";

export interface IBreadCrumbs {
    label: string;
    path?: string;
    icon?: IconComponent;
    index?: number;
    href?: string;
}