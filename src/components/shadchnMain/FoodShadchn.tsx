"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// Cloudinary config
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const uploadImage = async (file: File | null) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const result = await response.json();
        return result.secure_url;
    } catch (error) {
        return { "failed to upload image"  };
    }
};

const formSchema = z.object({
    title: z.string().min(2, { message: "Food name is too short" }),
    content: z.string().min(2, { message: "Content is too short" }),
    image: z.string().nonempty("Please upload an image"),
});

export const FoodShadchn = () => {
    const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            image: ""
        },
    });
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFoodImageFile(file);
        const tempUrl = URL.createObjectURL(file);
        setPreviewUrl(tempUrl);
        form.setValue("image", "uploaded", { shouldValidate: true });
    };
    const createFood = async (values: z.infer<typeof formSchema>) => {
        const imageUrl = await uploadImage(foodImageFile);
        if (!imageUrl || typeof imageUrl === 'object') {
            console.error("Image upload failed");
            return;
        }

        const res = await fetch("http://localhost:8000/food", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: values.title,
                content: values.content,
                image: imageUrl,
                category: "676e370164d1f8cafda026ac",
            }),
        });

        const data = await res.json();
        console.log("Created:", data);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createFood(values);
    };
    return (
        <div className="flex h-[850px] max-w-[1200px] flex-wrap p-5 items-start gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="w-[280px] h-[292px] flex flex-col justify-center items-center gap-6 sm:p-4 flex-1 self-stretch rounded-[20px] border border-dashed border-red-500">
                        <Button className="flex w-[40px] h-[40px] px-4 items-center gap-2 rounded-full bg-[#EF4444]" variant="outline">
                            +
                        </Button>
                        <h4>Add new Dish</h4>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Dish</DialogTitle>
                        <DialogDescription>
                            Fill in the form and click submit.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Food name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Soup" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Upload Image</FormLabel>
                                        <FormControl>
                                            <>
                                                <Input type="file" accept="image/*" onChange={handleImageChange} />
                                                {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-full h-auto rounded-md" />}
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
