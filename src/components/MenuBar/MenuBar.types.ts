export type MenuBarProps = {
    display: 'left' | 'right';
    menuItems: MenuItemProps[];
    onItemClick?: (item:MenuItemProps) => void;
}


export type MenuItemProps = {
    key: number;
    label: string;
    icon: React.ReactChild;
    children?: MenuItemProps[]
}


export type ReducerStateProps = {
    [key: number]: boolean
}


export type ReducerActionProps = 
{   
    type: "initialSet";
    payload: ReducerStateProps  
} |
{
    type: "showHide";
    payload: ReducerUpdateProps;
}


export type ReducerUpdateProps = {
    key: number;
    visible: boolean;
}
