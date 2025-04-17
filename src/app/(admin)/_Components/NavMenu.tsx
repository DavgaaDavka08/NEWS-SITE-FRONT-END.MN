
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NavMenu() {
    return (
        <div className="w-[15%]  h-screen border-gray-300  flex pt-9 pb-9 px-[var(--spacing-5,20px)] flex-col items-start gap-10 flex-shrink-0">
            <div className="flex gap-2">
                <Link href="/">
                    garaarai
                </Link>
                <div className="flex flex-col">
                    <h4 className="text-[18px] normal leading-7 font-semibold text-[#09090B]">
                        Мэдээгээ  нэмээрэй
                    </h4>
                    <p className="font-[Inter] text-[12px] normal leading-4 font-semibold text-[#71717A]">
                        Хүслээ
                    </p>
                </div>
            </div>
            <Link href={"/admin/addNews"}>
                <Button className="w-[150px] h-[40px] rounded-4xl ">дар</Button>
            </Link>
        </div>
    );
}
