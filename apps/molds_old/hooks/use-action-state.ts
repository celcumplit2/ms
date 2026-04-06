import {ProblemDetail} from '@/types/errors';
import {useActionState as useActionStateReact} from 'react';

export interface FormState {
  success: boolean;
  formData: FormData;
  error?: ProblemDetail;
  response?: unknown;
}

export interface UseActionStateProps {
  action: (previousState: FormState, formData: FormData) => Promise<FormState>,
  formData?: FormData,
  redirect?: string;
}

export default function useActionState({action, formData}: UseActionStateProps) {
  const [state, formAction, pending] = useActionStateReact(
    action,
    {
      success: false,
      formData: formData ?? new FormData(),
    },
  );

  return {
    state,
    formAction,
    pending,
  };
}
