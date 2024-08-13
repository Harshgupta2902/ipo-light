const mainSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "IpoTec",
    "url": "https://www.ipotec.in",
    "logo": "https://www.ipotec.in/logo.svg",
};

const ipoSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Ipo",
            "item": "https://www.ipotec.in/ipo",
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Upcoming Ipo",
            "item": "https://www.ipotec.in/ipo/upcomingIpo",
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Grey Market Ipo",
            "item": "https://www.ipotec.in/ipo/greyMarketIpo",
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "SME Ipo",
            "item": "https://www.ipotec.in/ipo/smeMarketIpo",
        },
        {
            "@type": "ListItem",
            "position": 5,
            "name": "Ipo Subscription Status",
            "item": "https://www.ipotec.in/ipo/subscriptionStatus",
        },
        {
            "@type": "ListItem",
            "position": 6,
            "name": "Ipo Forms",
            "item": "https://www.ipotec.in/ipo/ipoForms",
        },
        {
            "@type": "ListItem",
            "position": 7,
            "name": "Ipo Buyback",
            "item": "https://www.ipotec.in/ipo/sharesBuyBack",
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
