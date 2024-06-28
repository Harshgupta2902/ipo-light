export interface MenuItem {
    label: string;
    url: string;
    dropdown?: boolean;
    dropdownItems?: MenuItem[];
}
export interface NavItemProps {
    item: MenuItem;
    isActive: boolean;
    onItemClick: () => void;
}


export interface Root {
    id: string
    title: string
    slug: string
    type: any
    description: string
    blog: string
    author: string
    image: string
    alt_keyword: string
    tags: string
    category: string
    featured: string
    created_at: string
    published: string
    meta_description: string
    meta_title: string
    robots: string
    meta_keywords: string
    published_at: string
    views: string
}
export interface SWPFormInputs {
    totalInvestment: number;
    withdrawalPerMonth: number;
    expectedReturnRate: number;
    timePeriod: number;
}

export interface IpoData {
    id: string;
    Type: string;
    company_name: string;
    link: string;
    open: string;
    close: string;
    updated_at: string;
    slug: string;
}
export interface Props {
    data: {
        upcomingData: IpoData[];
        smeData: IpoData[];
    };
}



export interface BlogPost {
    id: string;
    title: string;
    created_at: string;
    category: string;
    image: string;
    slug: string;
    alt_keyword: string;
    description: string;
    author: string;
}

export interface BlogContent {
    id: string
    title: string
    slug: string
    type: any
    description: string
    blog: string
    author: string
    image: string
    alt_keyword: string
    tags: string
    category: string
    featured: string
    created_at: string
    published: string
    meta_description: string
    meta_title: string
    robots: string
    meta_keywords: string
    published_at: string
    views: string
}

export interface BlogPostProps {
    posts: BlogPost[];
}

export interface IPODetailsData {
    id: string;
    slug: string;
    tables: {
        name: string;
        data: string;
    }[];
    lists: {
        heading: string;
        items: string[];
    }[];
    company_name: string;
    date: string;
}
export interface BlogPostMainCardProps {
    post: BlogPost | null;
}

export interface IPODetailsMain {
    upcomingData: UpcomingData[];
    smeData: SmeData[];
    gmpData: GmpData[];
    buyBackData: BuyBackData[];
}

export interface UpcomingData {
    company_name: string;
    slug: string;
    open: string;
    close: string;
}

export interface SmeData {
    company_name: string;
    slug: string;
    open: string;
    close: string;
}

export interface GmpData {
    company_name: string;
    date: string;
    slug: string;
}

export interface BuyBackData {
    company_name: string;
    open: string;
    close: string;
    slug: string;
}

export interface GainersCardProps {
    gainers: StockData[];
}

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    percentChange: number;
    sid: string;

}

export interface StocksCardProps {
    gainers: StockData[];
    losers: StockData[];
    active: StockData[];
    approachingHigh: StockData[];
    approachingLow: StockData[];
}

export interface ChartDataItem {
    price: number;
    ts: string;
}
export interface SliderProps {
    imageUrls: string[];
}

export interface GmpDataTable {
    id: string;
    ipo_name: string;
    date: string;
    type: string;
    ipo_gmp: string;
    price: string;
    gain: string;
    kostak: string;
    subject: string;
    link: string;
    updated_at: string;
    slug: string;
}

export interface OldGmpDataTable {
    id: string;
    ipo_name: string;
    price: string;
    ipo_gmp: string;
    listed: string;
    link: string;
    updated_at: string;
    slug: string;
}

export interface FormsDataTables {
    id: string;
    name: string;
    date: string;
    date_link: string;
    bse: string;
    bse_link: string;
    nse: string;
    nse_link: string;
    link: string;
    updated_at: string;
    slug: string;
}

export interface Fund {
    mfId: string;
    slug: string;
    name: string;
    values: {
        filter: string;
        doubleVal?: number;
        strVal?: string;
    }[];
    sector: string;
}

export interface Screener {
    data: Fund[];
}
export interface BuyBackDataTable {
    id: string
    company_name: string
    record_date: string
    open: string
    link: string
    slug: string
    close: string
    price: string
    updated_at: string
}
export interface SmeDataTables {
    id: string;
    company_name: string;
    date: string;
    price: string;
    Platform: string;
    link: string;
    updated_at: string;
    slug: string;
}
export interface UpcomingDataTables {
    id: string;
    company_name: string;
    date: string;
    size: string;
    price: string;
    status: string;
    link: string;
    updated_at: string;
    slug: string;
}

export interface SubsCriptionDataTables {
    id: string;
    ipo_name: string;
    date: string;
    type: string;
    ipo_gmp: string;
    price: string;
    gain: string;
    kostak: string;
    subject: string;
    link: string;
    updated_at: string;
    slug: string;
}