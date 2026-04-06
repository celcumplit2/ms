import useActionState, {UseActionStateProps} from '@/hooks/use-action-state';
import {ProblemDetailType} from '@/types/errors';
import {useEffect} from 'react';
import {toast} from 'sonner';

export default function useDashboardActionState(props: UseActionStateProps) {
  const {state, formAction, pending} = useActionState(props);

  useEffect(() => {
    if (state.success) {
      toast.success('The form submission has been successfully handled!');
    }

    if (!state.success && state.error?.type === ProblemDetailType.InternalServerError) {
      toast.error(state.error?.title);
    }

    if (!state.success && Object.keys(state.error?.errors ?? {}).length > 0) {
      toast.error('Please address all validation issues!');
    }

    // TODO: Manage how to properly redirect the form after update.
    // if (state.redirect) {
    //   NextRedirect(state.redirect);
    // }
  }, [state]);

  return {
    state,
    formAction,
    pending,
  };
}
