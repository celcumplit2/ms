'use server';

import {SelectOption} from '@/components/dashboard/forms/custom-select';
import {createFailedResponse, createSuccessfulResponse} from '@/core/actions';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {slugify} from '@/helpers';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {addArticle, deleteArticle, editArticle, readArticleByAlias} from '@/modules/article/article.service';
import {browseAuthors, readAuthorRandom} from '@/modules/author/author.service';
import {browseSubCategories, readCategoryByAlias} from '@/modules/category/category.service';
import {ImportArticle, ImportUpdateArticle} from '@/types/import';
import {revalidatePath} from 'next/cache';

const PATH_ROOT = '/dashboard/articles';

export async function addArticleAction(previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await addArticle({data: formDataToObject(formData)});

    revalidatePath(PATH_ROOT);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function editArticleAction(id: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await editArticle({id, data: formDataToObject(formData)});

    revalidatePath(`${PATH_ROOT}/edit/${id}`);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function deleteArticleAction(id: number): Promise<void | string> {
  try {
    await deleteArticle({id});

    revalidatePath(PATH_ROOT);
  } catch (error) {
    return error instanceof Error ? error.message : 'Something goes wrong on server side!';
  }
}

export async function getAuthorSelectOptions(): Promise<SelectOption[]> {
  const authorCollection = await browseAuthors({offset: 0, limit: 1000});

  return authorCollection.items.map((author) => ({
    value: String(author.id),
    label: author.fullName,
  }));
}

export async function getCategorySelectOptions(): Promise<SelectOption[]> {
  const categoryCollection = await browseSubCategories({offset: 0, limit: 1000});

  return categoryCollection.items.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));
}

export async function importArticle(
  {
    payload: {
      category,
      description,
      publishAt,
      'meta.title': metaTitle,
      'meta.description': metaDescription,
      ...restPayload
    },
  }: { payload: ImportArticle },
): Promise<{ title: string, message: string } | void> {
  const categoryEntity = category
    ? await readCategoryByAlias({alias: category})
    : null;
  const authorEntity = await readAuthorRandom();

  try {
    await addArticle({
      data: {
        ...restPayload,
        categoryId: categoryEntity ? categoryEntity.id : null,
        authorId: authorEntity ? authorEntity.id : null,
        alias: slugify(restPayload.title),
        content: description,
        publishedAt: publishAt,
        meta: {
          title: metaTitle,
          description: metaDescription,
        },
      },
    });
  } catch (error) {
    return {
      title: restPayload.title,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}

export async function importUpdateArticle(
  {
    payload: {
      id,
      title,
      intro,
      image,
      description,
      'meta.title': metaTitle,
      'meta.description': metaDescription,
    },
  }: { payload: ImportUpdateArticle },
): Promise<{ title: string, message: string } | void> {
  const article = await readArticleByAlias({alias: id});

  if (!article) {
    return {
      title: id,
      message: `No article found for this id: ${id}`,
    };
  }

  try {
    await editArticle({
      id: article.id,
      data: {
        ...article,
        title: title || article.title,
        intro: intro || article.intro,
        image: image || article.image,
        content: description || article.content,
        meta: {
          title: metaTitle || article.metaTitle,
          description: metaDescription || article.metaDescription,
        },
      },
    });
  } catch (error) {
    return {
      title: id,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}
