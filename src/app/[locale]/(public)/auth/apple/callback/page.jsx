'use client'
import { useEffect, useState } from 'react'

const page = () => {
    const [tokens, setTokens] = useState(null)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            fetch("http://localhost:3050/v1/api/users/auth/apple", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: code, deviceName: "Iphone", devicePlatform: "App", osVersion: "v1.2.3" }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setTokens(data);
                    console.log("Backend response:", data);
                })
                .catch(() => {
                    alert("Error sending code to backend");
                });
        }
    }, []);
    return (
        <div className="max-w-xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-8 text-teal-700">Apple Auth Tokens</h2>
            {tokens ? (
                <>
                    <div className="mb-6">
                        <label className="block font-semibold text-teal-600 mb-2">Access Token:</label>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto break-words text-sm select-all">
                            {tokens.accessToken}
                        </pre>
                    </div>
                    <div>
                        <label className="block font-semibold text-teal-600 mb-2">Refresh Token:</label>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto break-words text-sm select-all">
                            {tokens.refreshToken}
                        </pre>
                    </div>
                </>
            ) : (
                <div className="text-slate-500">No tokens received yet.</div>
            )}
        </div>
    )
}

export default page