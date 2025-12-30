"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ContentContext = createContext<Record<string, string>>({});

export const useContent = () => useContext(ContentContext);

export default function ContentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [content, setContent] = useState<Record<string, string>>({});

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <ContentContext.Provider value={content}>
            {children}
        </ContentContext.Provider>
    );
}
