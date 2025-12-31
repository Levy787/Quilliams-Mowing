export type BoldHeadingsProps = {
    categories: readonly string[];
};

function HeadingWord({ word, index }: { word: string; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <span
            className={
                isEven
                    ? "text-primary"
                    : "text-transparent [-webkit-text-stroke:2px_var(--primary)]"
            }
        >
            {word}
        </span>
    );
}

export function BoldHeadings({ categories }: BoldHeadingsProps) {
    const duplicated = [...categories, ...categories];

    return (
        <section className="w-full py-10">
            <ul className="sr-only">
                {categories.map((word) => (
                    <li key={word}>{word}</li>
                ))}
            </ul>

            {/* Reduced motion: show a non-animated single row */}
            <div className="hidden motion-reduce:flex w-full overflow-x-auto px-4 md:px-8 lg:px-16">
                <div className="flex w-max items-baseline gap-x-12 whitespace-nowrap py-2 text-6xl font-extrabold tracking-tight leading-[1.1] md:text-8xl lg:text-9xl">
                    {categories.map((word, index) => (
                        <HeadingWord key={word} word={word} index={index} />
                    ))}
                </div>
            </div>

            {/* Motion allowed: infinite marquee to the left */}
            <div className="motion-reduce:hidden w-full overflow-x-hidden px-4 md:px-8 lg:px-16">
                <div
                    aria-hidden="true"
                    className="flex w-max items-baseline gap-x-12 whitespace-nowrap py-2 text-6xl font-extrabold tracking-tight leading-[1.1] md:text-8xl lg:text-9xl animate-marquee"
                >
                    {duplicated.map((word, index) => (
                        <HeadingWord key={`${word}-${index}`} word={word} index={index % categories.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}