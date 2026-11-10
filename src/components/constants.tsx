const mainSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "IpoTec",
    "url": "https://www.ipotec.in",
    "logo": "https://ipo-light.vercel.app/logo.svg",
};

const ipoSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Ipo",
            "item": "https://ipo-light.vercel.app/ipo",
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Upcoming Ipo",
            "item": "https://ipo-light.vercel.app/ipo/upcomingIpo",
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Grey Market Ipo",
            "item": "https://ipo-light.vercel.app/ipo/greyMarketIpo",
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "SME Ipo",
            "item": "https://ipo-light.vercel.app/ipo/smeMarketIpo",
        },
        {
            "@type": "ListItem",
            "position": 5,
            "name": "Ipo Subscription Status",
            "item": "https://ipo-light.vercel.app/ipo/subscriptionStatus",
        },
        {
            "@type": "ListItem",
            "position": 6,
            "name": "Ipo Forms",
            "item": "https://ipo-light.vercel.app/ipo/ipoForms",
        },
        {
            "@type": "ListItem",
            "position": 7,
            "name": "Ipo Buyback",
            "item": "https://ipo-light.vercel.app/ipo/sharesBuyBack",
        },
    ],
};

const mfSchema = {};

export const getSchema = (url: string) => {
    switch (true) {
        case "url".includes("/ipo"):
            return ipoSchema;
        case "url".includes("/mutualfunds"):
            return mfSchema;
        default:
            return mainSchema;
    }
};
