'use server';

import {createFailedResponse, createSuccessfulResponse} from '@/core/actions';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {readArticleByAlias} from '@/modules/article/article.service';
import {addComment, addDraftComment, deleteComment, editComment} from '@/modules/comment/comment.service';
import {ImportComment} from '@/types/import';
import {revalidatePath} from 'next/cache';

const PATH_ROOT = '/dashboard/comments';

export async function addCommentAction(articleId: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    return createSuccessfulResponse(
      await addComment({data: {...formDataToObject(formData), articleId}}),
      formData,
    );
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  // const actionWithArgs = addComment.bind(null, {
  //   data: {...formDataToNestedObject(formData), articleId},
  // });
  //
  // return withActionErrorHandler(actionWithArgs, formData);
}

export async function editCommentAction(id: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await editComment({id, data: formDataToObject(formData)});

    revalidatePath(`${PATH_ROOT}/edit/${id}`);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function deleteCommentAction(id: number): Promise<void | string> {
  try {
    await deleteComment({id});

    revalidatePath(PATH_ROOT);
  } catch (error) {
    return error instanceof Error ? error.message : 'Something goes wrong on server side!';
  }
}

export async function importComment({payload}: { payload: ImportComment }): Promise<{ title: string, message: string } | void> {
  const {publish_at, blog_id} = payload;
  const articleAlias = blog_id.replace('https://moldstud.com/articles/p-', '');
  const article = await readArticleByAlias({alias: articleAlias});

  if (!article) {
    return {
      title: payload.name,
      message: `Article with alias ${articleAlias} not found!`,
    };
  }

  try {
    await addComment({
      data: {
        ...payload,
        articleId: article.id,
        publishedAt: publish_at,
      },
    });
  } catch (error) {
    return {
      title: payload.name,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}

export async function handleCommentForm(articleId: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    return createSuccessfulResponse(
      await addDraftComment({data: {...formDataToObject(formData), articleId}}),
      formData,
    );
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}
