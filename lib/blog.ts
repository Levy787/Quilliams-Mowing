export type BlogSection = {
    id: string;
    title: string;
    body: string;
    bullets?: readonly string[];
    blocks?: readonly BlogBlock[];
};

export type BlogBlock =
    | {
        kind: "callout";
        title: string;
        body: string;
        bullets?: readonly string[];
    }
    | {
        kind: "table";
        title: string;
        description?: string;
        columns: readonly string[];
        rows: readonly { cells: readonly string[] }[];
    }
    | {
        kind: "imageGrid";
        title: string;
        description?: string;
        images: readonly {
            src: string;
            alt: string;
            caption?: string;
        }[];
    };

export type BlogRelatedLink = {
    label: string;
    href: string;
};

export type BlogFaq = {
    question: string;
    answer: string;
};

export type BlogItemList = {
    name: string;
    items: readonly BlogRelatedLink[];
};

export type BlogPost = {
    slug: string;
    title: string;
    subtitle: string;
    author: string;
    publishedDate: string;
    updatedDate: string;
    readingTime: string;
    heroImage: {
        src: string;
        alt: string;
    };
    seo: {
        title: string;
        description: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
    };
    quickAnswer: {
        title: string;
        body: string;
    };
    sections: readonly BlogSection[];
    relatedLinks: readonly BlogRelatedLink[];
    itemList?: BlogItemList;
    faqs: readonly BlogFaq[];
};
