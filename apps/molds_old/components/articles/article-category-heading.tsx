import styles from '@/styles/scss/articles/article-category-heading.module.scss';

export interface ArticleCategoryHeadingProps {
    title: string;
    subTitle: string;
    description?: string;
}

export default function ArticleCategoryHeading({title, subTitle, description}: ArticleCategoryHeadingProps) {
    return (
        <>
            <hgroup className={styles['heading']}>
                <p>{subTitle}</p>
                <h1>{title}</h1>
            </hgroup>
            {description && (
                <p>{description}</p>
            )}
        </>
    );
}
