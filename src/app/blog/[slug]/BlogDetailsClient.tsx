"use client";

import { useEffect, useState } from "react";
import BlockRenderer from "../BlockRenderer";

export default function BlogDetailsClient({ slug }: { slug: string }) {
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    useEffect(() => {
        if (!slug || !BASE_URL) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${BASE_URL}/blogs/details/slug/${slug}`
                );

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();

                setBlog(data.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, BASE_URL]);

    if (loading) {
        return (
            <div className="p-10 text-center text-gray-500">
                Loading blog...
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="p-10 text-center text-red-500">
                Blog not found
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-12 text-black">

                {blog.featuredImage && (
                    <img
                        src={blog.featuredImage}
                        alt={blog.title || "Blog image"} // ✅ FIXED
                        className="rounded-xl mb-6 w-full mt-12"
                    />
                )}

                <h1 className="text-4xl font-bold mb-4">
                    {blog.title}
                </h1>

                <p className="text-gray-500 mb-6">
                    {new Date(blog.createdAt).toDateString()}
                </p>

                <div className="space-y-4 text-gray-800">
                    <BlockRenderer blocks={blog.blocks} />
                </div>

            </div>
        </div>
    );
}