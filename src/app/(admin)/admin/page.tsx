// app/(admin)/admin/page.tsx
export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 uppercase font-semibold">Total Posts</p>
                    <p className="text-4xl font-bold text-blue-600 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 uppercase font-semibold">Drafts</p>
                    <p className="text-4xl font-bold text-orange-500 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 uppercase font-semibold">Admin Users</p>
                    <p className="text-4xl font-bold text-green-600 mt-2">1</p>
                </div>
            </div>
        </div>
    );
}