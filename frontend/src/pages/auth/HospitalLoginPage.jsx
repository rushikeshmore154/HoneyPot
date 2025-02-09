import UserLogin from "@/components/auth/user-login";
import React from "react";

const HospitalLoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <UserLogin url={"http://localhost:5000/api/hospital/login"} title={"Hospital Login"}
            redirect={"/hospital/dashboard"} />
        </div>
    );
};

export default HospitalLoginPage;
