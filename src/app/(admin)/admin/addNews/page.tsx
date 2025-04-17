"use client"
import { useCategory } from "@/app/_Context/category";
import { DialogDemoCategory } from "@/components/shadchnMain/CategoryShaddnDialogy";
import { FoodShadchn } from "@/components/shadchnMain/FoodShadchn";


import { NeswType } from "@/lib/Type";
// import { DialogDemos } from "@/components/ui/myshdchn/api-Shadchn/foodMenuDialogs";
import Image from "next/image";
import Link from "next/link";
export default function Catagory() {
    const { getCategory } = useCategory();
    return (
        <div className="w-[100%]  bg-[#F4F4F5] ">
            <div className="items-center w-[100%]   gap-8 justify-center flex flex-col ">
                <div className="w-[92%]  flex flex-col items-end">
                    <Link href="/">
                        <Image alt="" src="/Avatar.svg" width={35} height={35} />
                    </Link>
                </div>
                <div className="w-[92%]  flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
                    <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
                        Dishesh Category
                    </h4>
                    <div>
                        <DialogDemoCategory />
                    </div>
                </div>
                <div className="w-[92%]  flex flex-col items-start gap-4 rounded-sm">
                    {(getCategory ?? []).map((data: NeswType, index: number) => (
                        <div
                            key={index}
                            className="w-[100%] flex p-6 flex-col items-start gap-4 border border-[#E4E4E7] rounded-sm bg-white"
                        >
                            <div>
                                <p className="  text-[#18181B] text-sm font-medium leading-5">
                                    {data.categoryName}
                                </p>
                                <FoodShadchn />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

