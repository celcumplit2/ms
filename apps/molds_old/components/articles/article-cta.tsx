import Link from "next/link";

interface ArticleCTAProps {
    label?: string;
}

export default function ArticleCTA({label}: ArticleCTAProps) {
    return (
        <Link href="/hire-us" className="article-cta">{label ?? 'Hire Us'}</Link>
    );
}
