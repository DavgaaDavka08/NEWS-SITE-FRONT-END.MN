
import type React from "react"
import { Button } from "@/components/ui/button"
import { InputDemo } from "@/components/ui/inputHeader"
import { SheetDemo } from "@/components/shadchnMain/Sheet"
export function SiteHeader() {
    return (
        <header className="w-full  ">
            <div className="w-[90%] bg-[url('/kid.jpg')] bg-cover bg-center h-48 items-center  m-auto flex justify-between py-2 px-4 text-sm ">
                <div className="flex items-center ">
                    <div className="bg-[#2d4562] text-white p-2 mr-2 h-14 w-14 flex items-center justify-center text-2xl font-bold">
                        <span>BN</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#2d4562] text-3xl font-bold tracking-tight">Huslee</span>
                        <span className="text-[#2d4562] text-xs uppercase">News</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <InputDemo />
                    <Button>Дар</Button>
                </div>
                <SheetDemo />
            </div>
            {/* Navigation */}
        </header>
    )
}

