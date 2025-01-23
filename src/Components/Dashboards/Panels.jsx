import React, { useState } from 'react'
import Menubar from './Menubar'
import Sidebar from './Sidebar'

const Panels = () => {
    const [toggleSideBar, setToggleSideBar] = useState(true)
    return (
        <div>
            <Menubar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
            <Sidebar toggleSideBar={toggleSideBar} />
        </div>
    )
}

export default Panels