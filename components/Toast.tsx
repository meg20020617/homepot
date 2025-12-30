"use client";
import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: "success" | "error";
}

export default function Toast({ message, isVisible, onClose, type = "success" }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
    const icon = type === "success" ? "fa-check-circle" : "fa-times-circle";

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 transition-all duration-500 animate-slide-down`}>
            <i className={`fas ${icon} text-xl`}></i>
            <span className="font-medium tracking-wide">{message}</span>
        </div>
    );
}
