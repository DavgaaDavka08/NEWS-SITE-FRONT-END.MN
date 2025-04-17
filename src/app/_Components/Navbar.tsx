"use client"
import React, { useEffect, useState } from 'react'
export const Navbar = () => {
    const [date, setDate] = useState<string>("")
    useEffect(() => {
        const now = new Date()
        const month = now.getMonth() + 1
        const day = now.getDate()
        setDate(`${month} сарын ${day}`)
    }, [])
    return (
        <div>
            <div className="w-full m-auto bg-gray-200">
                <div className='w-[90%] items-center  m-auto flex justify-between py-2 px-4 text-sm border-b'>
                    <div>{date}</div>
                    <div className="flex items-center gap-4">
                        <p>°C, Улаанбаатар` :Цаг агаар..</p>
                        <p className="font-medium">USD3443.0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
