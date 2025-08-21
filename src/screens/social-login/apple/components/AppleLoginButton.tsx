'use client';
import React, { useEffect } from "react";

const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || '';

function appleLogin() {
    const url = `https://appleid.apple.com/auth/authorize?` +
        `response_type=id_token&` +
        `response_mode=fragment&` +
        `client_id=${APPLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(APPLE_REDIRECT_URI)}&` +
        `scope=name%20email&` +
        `state=SOME_RANDOM_STRING`;
    window.location.href = url;
}

const AppleLoginButton = () => {
    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const idToken = hashParams.get("id_token");
        if (idToken) {
            fetch("http://localhost:3050/v1/api/users/auth/apple", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken, deviceName: "Iphone", devicePlatform: "App", osVersion: "v1.2.3" }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Backend response:", data);
                })
                .catch(() => {
                    alert("Error sending code to backend");
                });
        }
    }, []);

    return (
        <button
            onClick={appleLogin}
            style={{
                background: "#000",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "20px",
            }}
        >
            Login with Apple
        </button>
    );
};

export default AppleLoginButton;