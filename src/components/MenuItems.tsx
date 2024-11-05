import React from 'react'


type MenuItemsProps = {
    inputType?: string
    styleLabel?: string
    styleContainer: string
    label: string
    icon?: React.ReactNode
}
const MenuItems: React.FC<MenuItemsProps> = ({ inputType, styleLabel, label, styleContainer, icon }: MenuItemsProps): JSX.Element => {
    return (
        <div className={styleContainer}>
            {inputType && <input type={inputType} />}
            {icon}
            <label htmlFor="" className={styleLabel}>{label}</label>

        </div>
    )
}

export default MenuItems