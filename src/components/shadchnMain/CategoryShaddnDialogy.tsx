'use client';
import { useCategory } from "@/app/_Context/category";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { NeswType } from "@/lib/Type";
import { Label } from "../ui/label";

const formSchema = z.object({
    categoryName: z.string().min(2, { message: "Category name must be at least 2 characters." }),
});
export function DialogDemoCategory() {
    const [open, setOpen] = useState(false);
    const { addData, getCategory, deleteCategory, updateCategory } = useCategory();

    const [categoryName, setCategoryName,] = useState("");

    async function onSubmit() {
        try {
            formSchema.parse({ categoryName });
            await addData({ categoryName });
            setCategoryName("");
            setOpen(false);

        } catch (error) {
            console.error("Validation failed:", error);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                {getCategory?.map((data: NeswType, index) => (
                    <ContextMenu key={index}>
                        <ContextMenuTrigger className="px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition cursor-pointer text-sm font-medium text-gray-800">
                            {data.categoryName}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-48">
                            <ContextMenuItem inset className="text-red-500 hover:text-red-600" onClick={() => deleteCategory(data._id)}>Delete</ContextMenuItem>

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">update</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                                id="name"
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button

                                            onClick={() => {

                                                if (!categoryName.trim()) {
                                                    console.error("Категори нэр хоосон байна");
                                                    return;
                                                }
                                                updateCategory(data._id, categoryName);
                                            }}

                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                        +
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Категори нэмэх</DialogTitle>
                        <DialogDescription>Шинэ категори нэрээ оруулна уу.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Жишээ: Technology"
                            className="w-full"
                        />
                        <Button type="button" onClick={onSubmit} className="w-full">
                            Submit
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
