// hooks/useFetchMetadata.ts
import { useEffect, useState } from "react";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { Metadata } from "next";

const useFetchMetadata = () => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metaData = await get(endpoints.metaData);
        console.log(`metaData ${metaData}`);
        
        const robots =
          process.env.APP_MODE === "production"
            ? metaData?.result?.robots
            : "nofollow, noindex";
        const metaTitle = metaData?.result?.meta_title
          ? metaData?.result?.meta_title
          : "Gradding";
        const metaDescription = metaData?.result?.meta_description
          ? metaData?.result?.meta_description
          : "Gradding";

        const metadataBase =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const canonical_url = "";

        setMetadata({
          title: metaTitle,
          description: metaDescription,
          robots: robots,
          metadataBase: new URL(metadataBase),
          openGraph: {
            images: [`${metadataBase}/openGraph/test-prep.png`],
            title: metaTitle,
            description: metaDescription,
          },
          alternates: {
            canonical: canonical_url?.toLowerCase(),
          },
        });
      } catch (error) {
        console.error("Failed to fetch metadata", error);
      }
    };

    fetchMetadata();
  }, []);

  return metadata;
};

export default useFetchMetadata;
