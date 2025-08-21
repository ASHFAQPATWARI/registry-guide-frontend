import AppleLoginButton from "@/screens/social-login/apple/components/AppleLoginButton";
import React from "react";

async function AppleLogin() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <AppleLoginButton />
        </div>
    )
}

export default AppleLogin;