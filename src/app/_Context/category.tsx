'use client';
import { NeswType } from "@/lib/Type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type NewsContextTypes = {
    getCategory: NeswType[];
    setGetCategory: (callfood: NeswType[]) => void;
    addData: (callfood: NeswType) => void;
    deleteCategory: (id: string) => void;
    updateCategory: (id: string, categoryName: string) => void;
};

export const NewsContexts = createContext<NewsContextTypes>({} as NewsContextTypes);

export const useCategory = () => {
    return useContext(NewsContexts);
};

function NewsProvider({ children }: { children: ReactNode }) {
    const [getCategory, setGetCategory] = useState<NeswType[]>([]);

    // Get data from the API
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:2000/category");
            const jsonData = await response.json();
            setGetCategory(jsonData.getNews);
            console.log('jsonData endeer hyadgalgdaad baih ym :>> ', jsonData);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Add a new category
    const addData = async ({ categoryName }: { categoryName: string }) => {
        try {
            const addCategory = await fetch("http://localhost:2000/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryName }),
            });

            if (!addCategory.ok) {
                throw new Error(`Failed to add category. Status: ${addCategory.status}`);
            }

            const jsonCategory = await addCategory.json();
            console.log("New category added: ", jsonCategory);

            getData();
        } catch (error) {
            console.error("Error adding category: ", error);
        }
    }; //delete
    const deleteCategory = async (id: string) => {
        try {
            const deleteCategory = await fetch(
                `http://localhost:2000/category/:newsCategoryId${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!deleteCategory.ok) {
                throw new Error(`getdata status:${deleteCategory.status}`);
            }
            console.log("deleteCategory ajillaj baina uu?????/ :>> ", deleteCategory);
        } catch (error) {
            console.log("error :>> ", error);
        }
        getData();
    };
    //update
    const updateCategory = async (id: string, categoryName: string) => {
        try {
            const updatedata = await fetch(
                `http://localhost:2000/category/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ categoryName }),
                }
            );
            console.log("id :>> ", id);
            if (!updatedata.ok) {
                throw new Error(`update:>Status${updatedata.status}`);
            }
            const fetchUpDateData = await updatedata.json();
            console.log("Амжилттай өөрчлөгдлөө", fetchUpDateData);
            await getData();
        } catch (error) {
            console.log("oorchlohod aldaa garlaa", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <NewsContexts.Provider value={{ getCategory, setGetCategory, addData, deleteCategory, updateCategory }}>
            {children}
        </NewsContexts.Provider>
    );
}

export default NewsProvider;
