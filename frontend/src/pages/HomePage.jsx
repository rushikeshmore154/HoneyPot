import HospitalList from "@/components/home/hospital-list";
import HomeLayout from "@/components/home/layouts/home-layout";
import React from "react";

const HomePage = () => {
    return (
        <HomeLayout>
            <HospitalList />
        </HomeLayout>
    );
};

export default HomePage;
