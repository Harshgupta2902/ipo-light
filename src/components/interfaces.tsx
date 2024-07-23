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
    Type: string
    company_name: string
    open: string
    close: string
    link?: string
    slug?: string
}
export interface IpoMainHomePageProps {
    upcomingData: IpoData[];
    smeData: IpoData[];
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
    searchQuery?: string;
    sortColumn?: string;
    sortOrder?: "asc" | "desc";
    selectedFilters?: { sector: string[]; option: string[] };
    itemsPerPage?: number;
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



export interface MfHomePageDetails {
    info: Info
    summary: Summary
    fundmanager: MfHomePageFundmanager[]
    inv_checkList: InvCheckList[]

}

export interface Info {
    mfId: string
    type: string
    name: string
    slug: string
    visible: boolean
    amc: string
    navClose: number
    navCh1d: number
    option: string
    sector: string
    subsector: string
}

export interface Summary {
    meta: Meta
    peers: Peer[]
    schemeInfo: SchemeInfo[]
    keyRatios: KeyRatio[]
    cagrSeries: CagrSery[]
    taxMeta: TaxMeta
    amcDetails: AmcDetails
    labels: Label[]
}

export interface Meta {
    name: string
    isin: string
    amc: string
    plan: string
    benchmarkIndex: string
    sector: string
    subsector: string
    riskClassification: string
    option: string
    visible: boolean
    active: boolean
    subsectorDesc: string
    fundType: string
    fullName: string
    isPrimary: boolean
    exitLoadRemarks: string
    invAmountInfo: string
    fmCode: string[]
    keywords: string[]
    sipinvest: string
    lumpsum: boolean
    amcCode: string
    type: string
    mbId: string
}

export interface Peer {
    mfId: string
    name: string
    option: string
    slug: string
    ratios: Ratio[]
}

export interface Ratio {
    backL: string
    value?: number
}

export interface SchemeInfo {
    backL: string
    value: any
    info?: string
}

export interface KeyRatio {
    backL: string
    value: number
    info: any
}

export interface CagrSery {
    date: string
    value: number
    yearDiff: number
}

export interface TaxMeta {
    minSipAmount: number
    minLumpInvAmt: number
    minReturn: number
    maxReturn: number
    return: number
    fundType: string
    lockInPeriod: number
}

export interface AmcDetails {
    amc: string
    description: string
    mfCount: string
    aum: number
    amcCode: string
    website: string
    etfCount: number
}

export interface Label {
    title: string
    description: string
}

export interface MfHomePageFundmanager {
    fmCode: number
    name: string
    imgUrl: string
    qualification: string
    exp: string
    pastExp: string
    aumInCr: number
    funds: Fund[]
}

export interface Fund {
    sector: string
    subsector: string
    option: string
    name: string
    mfId: string
    ratios: Ratio2[]
}

export interface Ratio2 {
    backL: string
    value?: number
}

export interface InvCheckList {
    icid: string
    title: string
    description: string
    state: string
    explanation: string
}
