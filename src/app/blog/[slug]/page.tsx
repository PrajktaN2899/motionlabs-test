import { cache } from "react";
import BlogDetailsClient from "./BlogDetailsClient";
import JsonLd from "@/components/JsonLd";
import { blogPosting, graph, webPage } from "@/lib/schema";

// ✅ IMPORTANT: Make page dynamic (fixes your issue)
export const dynamic = "force-dynamic";

// ✅ OPTIONAL: If you want caching (uncomment this instead of force-dynamic)
// export const revalidate = 60;

// Shared by generateMetadata and the page, so the post is fetched once per request
const getBlog = cache(async (slug: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(
        `${BASE_URL}/blogs/details/slug/${slug}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();
    return data?.data;
});

// ✅ SEO (NOW dynamic, no stale data)
export async function generateMetadata({ params }: any) {
    const { slug } = await params;

    try {
        const blog = await getBlog(slug);

        if (!blog) {
            return {
                title: "Blog not found",
                description: "This blog does not exist",
            };
        }

        return {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.subtitle || "",
            openGraph: {
                title: blog.metaTitle || blog.title,
                description: blog.metaDescription || "",
                images: blog.featuredImage ? [blog.featuredImage] : [],
            },
        };
    } catch (err) {
        return {
            title: "Blog",
            description: "Error loading blog",
        };
    }
}

export default async function Page({ params }: any) {
    const { slug } = await params;
    const path = `/blog/${slug}/`;
    const blog = await getBlog(slug).catch(() => null);

    return (
        <>
            {blog?.title && (
                <JsonLd
                    data={graph(
                        ...webPage({
                            path,
                            name: blog.metaTitle || blog.title,
                            description: blog.metaDescription || blog.subtitle || "",
                            crumbs: [
                                { name: "Home", path: "/" },
                                { name: "Resources", path: "/resources/" },
                                { name: blog.title, path },
                            ],
                        }),
                        blogPosting(path, blog),
                    )}
                />
            )}
            <BlogDetailsClient slug={slug} />
        </>
    );
}
