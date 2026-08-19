import BlogDetailsClient from "./BlogDetailsClient";

// ✅ IMPORTANT: Make page dynamic (fixes your issue)
export const dynamic = "force-dynamic";

// ✅ OPTIONAL: If you want caching (uncomment this instead of force-dynamic)
// export const revalidate = 60;

// ✅ SEO (NOW dynamic, no stale data)
export async function generateMetadata({ params }: any) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const { slug } = await params;

    try {
        const res = await fetch(
            `${BASE_URL}/blogs/details/slug/${slug}`,
            {
                cache: "no-store",
            }
        );

        const data = await res.json();
        const blog = data?.data;

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

// ✅ PAGE (no change needed here)
export default async function Page({ params }: any) {
    const { slug } = await params;

    return <BlogDetailsClient slug={slug} />;
}