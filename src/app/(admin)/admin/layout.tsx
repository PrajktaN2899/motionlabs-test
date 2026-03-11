// app/(admin)/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans antialiased">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-200 p-6 flex flex-col fixed inset-y-0">
                <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
                    <span className="bg-blue-600 p-1.5 rounded-lg text-xs">WP</span>
                    Company Admin
                </h2>

                <nav className="flex-1 space-y-1">
                    <Link href="/admin" className="block py-2.5 px-4 rounded transition hover:bg-slate-800 hover:text-white">Dashboard</Link>
                    <Link href="/admin/posts" className="block py-2.5 px-4 rounded transition hover:bg-slate-800 hover:text-white">Manage Blogs</Link>
                    <Link href="/admin/posts/new" className="block py-2.5 px-4 rounded transition hover:bg-slate-800 hover:text-white">+ Write New</Link>
                </nav>

                <div className="mt-auto border-t border-slate-800 pt-6">
                    <Link href="/" className="block py-2.5 px-4 rounded text-sm text-slate-400 hover:text-white">View Main Site</Link>
                    <button className="w-full text-left py-2.5 px-4 rounded text-sm text-red-400 hover:bg-red-900/20">Logout</button>
                </div>
            </aside>

            {/* Main Content (Shifted to the right of Sidebar) */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}