import React from 'react';

interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    og?: {
        title?: string;
        description?: string;
        url?: string;
        type?: string;
        image?: string;
    };
    twitter?: {
        card?: string;
        title?: string;
        description?: string;
        image?: string;
    };
    additionalMetaTags?: {
        name?: string;
        content?: string;
    }[];
}

interface HeaderProps {
    metaData: Metadata | null;
}

const MetaView: React.FC<HeaderProps> = ({ metaData }) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format


    const schema = metaData ? {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "IpoTech",
        "author": {
            "@type": "Organization",
            "name": "IpoTech"
        },
        "datePublished": currentDate,
        "description": metaData.description ?? "IpoTech",
    } : {};

    return (
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest"></link>
            <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>
            <meta name="ahrefs-site-verification" content="87106f56afba722eeac5b1e22675225b9b8844cff91992e9fd2b281d1e14deb2" />
            <meta httpEquiv="Content-Language" content="en-us" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="Copyright" content="Copyright 2024 @ IpoTech" />
            {metaData && (
                <>
                    {metaData.title && <title>{metaData.title}</title>}
                    {metaData.description && <meta name="description" content={metaData.description} />}
                    {metaData.keywords && metaData.keywords.length > 0 && <meta name="keywords" content={metaData.keywords.join(", ")} />}
                    {metaData.canonical && <link rel="canonical" href={`https://node.onlineinfotech.net${metaData.canonical}`} />}

                    {metaData.og && (
                        <>
                            {metaData.og.title && <meta property="og:title" content={metaData.og.title} />}
                            {metaData.og.description && <meta property="og:description" content={metaData.og.description} />}
                            {metaData.og.url && <meta property="og:url" content={`https://node.onlineinfotech.net${metaData.og.url}`} />}
                            {metaData.og.type && <meta property="og:type" content={metaData.og.type} />}
                            {metaData.og.image && <meta property="og:image" content={metaData.og.image} />}
                        </>
                    )}

                    {metaData.twitter && (
                        <>
                            {metaData.twitter.card && <meta name="twitter:card" content={metaData.twitter.card} />}
                            {metaData.twitter.title && <meta name="twitter:title" content={metaData.twitter.title} />}
                            {metaData.twitter.description && <meta name="twitter:description" content={metaData.twitter.description} />}
                            {metaData.twitter.image && <meta name="twitter:image" content={metaData.twitter.image} />}
                        </>
                    )}

                    {metaData.additionalMetaTags && metaData.additionalMetaTags.map((tag, index) => (
                        tag.name && tag.content && <meta key={index} name={tag.name} content={tag.content} />
                    ))}

                    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

                </>
            )}
        </head>
    );
};

export default MetaView;
