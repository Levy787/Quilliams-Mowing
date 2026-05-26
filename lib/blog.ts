export type BlogSection = {
    id: string;
    title: string;
    body: string;
    bullets?: readonly string[];
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
