// app/(admin)/admin/posts/new/page.tsx
export default function CreateNewPost() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <a href="/admin/posts" className="text-gray-500 hover:text-gray-800 text-sm">← Back to Posts</a>
                <h1 className="text-3xl font-bold">New Post</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
                        <input type="text" className="w-full border-gray-200 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Catchy Headline..." />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                        <textarea rows={12} className="w-full border-gray-200 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Start writing your story here..."></textarea>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold mb-4">Publishing Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Author</label>
                                <input type="text" defaultValue="Admin" className="w-full border p-2 rounded text-sm bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Category</label>
                                <select className="w-full border p-2 rounded text-sm">
                                    <option>News</option>
                                    <option>Guides</option>
                                    <option>Announcements</option>
                                </select>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                                Publish Now
                            </button>
                            <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                                Save as Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}