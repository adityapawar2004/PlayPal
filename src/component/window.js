import React, { useState } from 'react'

const Window = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div style={{ borderRadius: "50%", width: "30px", height: "30px",backgroundColor:"black" }} onClick={() => setOpen(!open)}>
            </div>
        </>
    )
}

export default Window
