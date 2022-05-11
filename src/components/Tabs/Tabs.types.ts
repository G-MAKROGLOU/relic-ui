import React from "react";

export type TabsProps = {
    tabs: TabItemProps[];
    children?: React.ReactChild | React.ReactChildren | any;
    tabStyle?: "square" | "pills" | "underline" | "boxed";
    isEditable?: boolean;
    extras?: TabsExtrasProps;
    maxVisibleTabs?: number;
    onAdd?: () => void;
    onClose?: (tab:TabItemProps) => void;
    onChange?: (prevTab: TabItemProps, nextTab: TabItemProps) => void;
}


export type TabsExtrasProps = {
    position: "left" | "right"
    content: React.ReactChild | React.ReactChildren
}


export type TabItemProps = {
    key: number;
    label: string;
    component: React.ReactChild | React.ReactChildren
}