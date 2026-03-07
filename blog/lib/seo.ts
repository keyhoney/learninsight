import { Metadata } from "next";
import { toImageUrl } from "@/lib/image-url";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "book";
  lang?: string;
}

const siteName = "Mathesis";
const defaultDescription = "학습과학 기반 부모 교육을 위한 지식 아카이브입니다. 가이드, 개념, 툴킷, 블로그, 도서를 제공합니다.";

export function constructMetadata({
  title,
  description = defaultDescription,
  image = "https://picsum.photos/seed/learning/1200/630",
  url = process.env.APP_URL || "http://localhost:3000",
  type = "website",
  lang,
}: SeoProps = {}): Metadata {
  const imageUrl = image ? toImageUrl(image) : undefined;
  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    ...(lang && { other: { "content-language": lang } }),
    openGraph: {
      title: title ? `${title} | ${siteName}` : siteName,
      description,
      type,
      url,
      ...(lang && { locale: lang }),
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title || siteName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteName}` : siteName,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  };
}
