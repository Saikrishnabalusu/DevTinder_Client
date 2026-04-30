import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const alertClassMap = {
    success: "alert alert-success",
    error: "alert alert-error",
    warning: "alert alert-warning",
    info: "alert alert-info",
};

const Alert = ({ type, message }) => {
    const [showAlert, setShowAlert] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowAlert(false), 3000);
        return () => clearTimeout(timer);
    }, [])

    if (!showAlert) return null;
    return (
        showAlert && (<div className="toast toast-top toast-end absolute top-16 w-96 h-16 z-50 ">
            <div className='w-full h-full relative'>
                <div className={` ${alertClassMap[type] ?? alertClassMap.info}  overflow-auto h-16`}>
                    <span className='w-full h-full'>{message}</span>
                    <span className='absolute top-auto right-0 cursor-pointer' onClick={() => setShowAlert(false)}>❌</span>
                </div>
            </div>

        </div>)
    )
}

export default Alert