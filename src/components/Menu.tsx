import React, { useEffect, useRef, useState } from 'react'



type MenuProps = {

    buttonLabelOrIcon: string | React.ReactNode
    styleButton: string
    styleMenuContainer: string
    children: React.ReactNode

}


const Menu: React.FC<MenuProps> = ({ buttonLabelOrIcon, styleButton, styleMenuContainer, children }): JSX.Element => {



    const [menu, setMenu] = useState(false)
    const [menuHeight, setMenuHeight] = useState<string>('0px')
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)


    useEffect(() => {

        if (menuRef.current) {
            setMenuHeight(`${menuRef.current.scrollHeight}px`)
        }

        const handleMouseDown = (event: MouseEvent) => {

            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setMenu(false)
            }
        }
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [menu])


    return (
        <button className={styleButton}
            ref={buttonRef}
            onClick={() => setMenu(!menu)}
        >

            {buttonLabelOrIcon}


            {/*  ********************************************* MENU ************************************* MENU ****************************************** */}
            <div
                className={`absolute shadow-md rounded-md bg-[#dddddd] transition-all duration-500 ease-out overflow-hidden ${styleMenuContainer} 
                    }`}
                style={{ height: menu ? menuHeight : '0px' }}
                ref={menuRef}
            >



                {children}

            </div>
        </button>





    )
}

export default Menu