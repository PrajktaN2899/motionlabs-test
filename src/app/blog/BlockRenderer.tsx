import React from "react";

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    return (
        <div className="space-y-4 md:space-y-6">
            {blocks?.map((block) => {
                switch (block.type) {

                    // =============================
                    // HEADINGS
                    // =============================
                    case "heading1":
                        return (
                            <h1 key={block.id} className="text-2xl md:text-4xl font-bold">
                                {block.content}
                            </h1>
                        );

                    case "heading2":
                        return (
                            <h2 key={block.id} className="text-xl md:text-3xl font-semibold">
                                {block.content}
                            </h2>
                        );

                    case "heading3":
                        return (
                            <h3 key={block.id} className="text-lg md:text-2xl font-medium">
                                {block.content}
                            </h3>
                        );

                    // =============================
                    // PARAGRAPH
                    // =============================
                    case "paragraph":
                        return (
                            <p key={block.id} className="text-gray-700 leading-relaxed">
                                {block.content}
                            </p>
                        );

                    // =============================
                    // QUOTE
                    // =============================
                    case "quote":
                        return (
                            <blockquote
                                key={block.id}
                                className="border-l-4 border-purple-500 pl-3 md:pl-4 italic text-sm md:text-base text-gray-600"
                            >
                                {block.content}
                            </blockquote>
                        );

                    // =============================
                    // BULLET LIST
                    // =============================
                    case "bullet-list":
                        return (
                            <ul key={block.id} className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base">
                                {block.content.split("\n").map((item: string, i: number) => (
                                    <li className="list-decimal pl-4 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base" key={i}>{item}</li>
                                ))}
                            </ul>
                        );

                    // =============================
                    // NUMBER LIST
                    // =============================
                    case "number-list":
                        return (
                            <ol key={block.id} className="list-decimal pl-6 space-y-2">
                                {block.content.split("\n").map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>
                        );

                    // =============================
                    // CODE
                    // =============================
                    case "code": {
                        const buildHTML = (html: string) => {
                            return `
      <html>
        <head>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            html, body {
              margin: 0;
              padding: 0;
              background: transparent !important;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          ${html}

          <script>
            function sendHeight() {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ height }, "*");
            }

            // Initial
            window.onload = sendHeight;

            // Observe changes
            const observer = new ResizeObserver(sendHeight);
            observer.observe(document.body);
          </script>
        </body>
      </html>
    `;
                        };

                        const finalHTML = buildHTML(block.content);

                        return (
                            <iframe
                                key={block.id}
                                srcDoc={finalHTML}
                                className="w-full"
                                style={{
                                    border: "none",
                                    display: "block",
                                }}
                                sandbox="allow-scripts"
                                onLoad={(e) => {
                                    const iframe = e.currentTarget;

                                    window.addEventListener("message", (event) => {
                                        if (event.data?.height) {
                                            iframe.style.height = event.data.height + "px";
                                        }
                                    });
                                }}
                            />
                        );
                    }

                    // =============================
                    // DIVIDER
                    // =============================
                    case "divider":
                        return (
                            <div key={block.id} className="flex justify-center py-4">
                                <div className="flex gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                </div>
                            </div>
                        );

                    // =============================
                    // IMAGE
                    // =============================
                    case "image":
                        return (
                            <div key={block.id} className="space-y-2">
                                <img
                                    src={block.imageUrl}
                                    className="rounded-xl w-full"
                                />
                                {block.imageCaption && (
                                    <p className="text-sm text-gray-500 text-center">
                                        {block.imageCaption}
                                    </p>
                                )}
                            </div>
                        );

                    // =============================
                    // VIDEO
                    // =============================
                    case "video-embed":
                        const getEmbedUrl = (url: string) => {
                            if (url.includes("youtu.be")) {
                                const id = url.split("/").pop()?.split("?")[0];
                                return `https://www.youtube.com/embed/${id}`;
                            }

                            if (url.includes("watch?v=")) {
                                return url.replace("watch?v=", "embed/");
                            }

                            return url;
                        };

                        return (
                            <div key={block.id} className="aspect-video">
                                <iframe
                                    src={getEmbedUrl(block.embedUrl)}
                                    className="w-full h-full rounded-xl"
                                    allowFullScreen
                                />
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}