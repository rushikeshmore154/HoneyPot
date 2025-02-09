import React from "react";
import Navbar from "../navbar";

export default function HomeLayout({ children }) {
    return (
        <div className="flex flex-col space-y-4 py-12">
            <Navbar />
            {children}
        </div>
    );
}
