'use client';
import React from "react";

function appleLogin() {
    const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();

    const url =
        `https://appleid.apple.com/auth/authorize?` +
        `response_type=code%20id_token&` +
        `response_mode=form_post&` +
        `client_id=${encodeURIComponent(APPLE_CLIENT_ID || '')}&` +
        `redirect_uri=${encodeURIComponent(APPLE_REDIRECT_URI || '')}&` +
        `scope=name%20email&` +
        `state=${encodeURIComponent(state)}&` +
        `nonce=${encodeURIComponent(nonce)}`;

    window.location.href = url;
}

const AppleLoginButton = () => {
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