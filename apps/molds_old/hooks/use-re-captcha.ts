import {FormEvent, useState} from 'react';

export default function useReCaptcha({inputs = []}: { inputs?: string[] }) {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [requestTokenGeneration, setRequestTokenGeneration] = useState<boolean>(false);

  function onTokenChange(token: string): void {
    setHasToken(token.length > 0);
  }

  function onFormChange(event: FormEvent<HTMLFormElement>) {
    if (inputs.length === 0) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    setRequestTokenGeneration(
      inputs.every((input) => {
        const value = formData.get(input);

        return value !== null && value.toString().length > 0;
      }),
    );
  }

  return {
    hasToken,
    onTokenChange,
    onFormChange,
    requestTokenGeneration,
    setRequestTokenGeneration,
  };
}
