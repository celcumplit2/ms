'use client';

import {handleCommentForm} from '@/modules/comment/comment.action';
import Button from '@/components/forms/button';
import Fieldset from '@/components/forms/fieldset';
import Form from '@/components/forms/form';
import FormInput from '@/components/forms/form-input';
import FormTextarea from '@/components/forms/form-textarea';
import useActionState from '@/hooks/use-action-state';
import styles from '@/styles/scss/comments/comment-form.module.scss';
import {ProblemDetailType} from '@/types/errors';

interface CommentFormProps {
    articleId: number;
}

export default function CommentForm({articleId}: CommentFormProps) {
    const actionWithArticleId = handleCommentForm.bind(null, articleId);

    const {state, formAction, pending} = useActionState({
        action: actionWithArticleId,
    });

    return (
        <Form
            id={styles['comment-form']}
            action={formAction}
            success={state.success}
            thanksId="comment-form-success"
            thanksMessage="Thank you for your comment."
            internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
        >
            <h3>Add new comment</h3>

            <Fieldset>
                <div>
                    <FormInput
                        label="Full Name"
                        name="name"
                        required={true}
                        placeholder="John Doe"
                        defaultValue={state.formData.get('name')?.toString()}
                        error={state.error?.errors?.name}
                        maxLength={255}
                        autoComplete="name"
                    />
                </div>
                <div>
                    <FormInput
                        type="email"
                        label="E-mail Address"
                        name="email"
                        required={true}
                        placeholder="jdoe@moldstud.com"
                        defaultValue={state.formData.get('email')?.toString()}
                        error={state.error?.errors?.email}
                        maxLength={254}
                        autoComplete="email"
                    />
                </div>
            </Fieldset>

            <Fieldset>
                <FormTextarea
                    label="Message"
                    name="content"
                    required={true}
                    defaultValue={state.formData.get('content')?.toString()}
                    error={state.error?.errors?.content}
                    rows={5}
                    maxLength={4000}
                />
            </Fieldset>

            <Button type="submit" disabled={pending}>
                Add a comment
            </Button>
        </Form>
    );
}
