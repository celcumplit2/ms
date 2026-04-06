import styles from '@/styles/scss/articles/article-category-description.module.scss';

interface ArticleCategoryDescriptionProps {
    description: string;
}

export default function ArticleCategoryDescription({description}: ArticleCategoryDescriptionProps) {
    return (
        <div className={styles['category-description']} dangerouslySetInnerHTML={{__html: description}}/>
    );
}
