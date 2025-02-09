import UserLogin from "@/components/auth/user-login";
import React from "react";

const UserLoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <UserLogin
                url={"http://localhost:5000/api/user/login"}
                title={"User Login"}
                redirect={"/home"}
            />
        </div>
    );
};

export default UserLoginPage;
