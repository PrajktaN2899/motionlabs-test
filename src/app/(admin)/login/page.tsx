// app/(admin)/login/page.tsx
export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-xl font-bold text-center mb-6">Staff Login</h1>
                <input type="text" placeholder="Username" className="w-full mb-4 p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full mb-6 p-2 border rounded" />
                <button className="w-full bg-slate-800 text-white py-2 rounded">Sign In</button>
            </div>
        </div>
    );
}