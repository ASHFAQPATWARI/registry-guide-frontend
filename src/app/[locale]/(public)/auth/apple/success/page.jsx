import { cookies } from "next/headers"

export default function SuccessPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("access-token")?.value
  const refreshToken = cookieStore.get("refresh-token")?.value

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-8 text-teal-700">Apple Auth Tokens</h2>
      {accessToken ? (
        <>
          <div className="mb-6">
            <label className="block font-semibold text-teal-600 mb-2">Access Token:</label>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto break-words text-sm select-all">
              {accessToken}
            </pre>
          </div>
          <div>
            <label className="block font-semibold text-teal-600 mb-2">Refresh Token:</label>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto break-words text-sm select-all">
              {refreshToken}
            </pre>
          </div>
        </>
      ) : (
        <div className="text-slate-500">No tokens received yet.</div>
      )}
    </div>
  )
}
