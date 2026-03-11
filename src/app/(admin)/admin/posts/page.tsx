// app/(admin)/admin/posts/page.tsx
import Link from 'next/link';

export default function ManagePosts() {
    // Mock data - eventually this will come from your DB
    const posts = [
        { id: 1, title: "How to scale Next.js", date: "2024-05-10", status: "Published" },
        { id: 2, title: "Our New Office", date: "2024-05-12", status: "Draft" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
                <Link href="/admin/posts/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    + Create New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Title</th>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b last:border-none hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{post.title}</td>
                                <td className="p-4 text-gray-500 text-sm">{post.date}</td>
                                <td className="p-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-3">
                                    <button className="text-blue-600 hover:underline">Edit</button>
                                    <button className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}