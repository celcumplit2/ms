import Papa, {ParseError} from 'papaparse';
import {ChangeEvent, MouseEvent, useReducer, useState} from 'react';

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = (event) => {
      reject(event);
    };
  });
}

interface ProgressState {
  total: number;
  imported: number;
  progress: number;
}

type ProgressAction = { type: 'SET_TOTAL', total: number } | { type: 'INCREMENT_IMPORTED' };

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'SET_TOTAL':
      return {...state, total: action.total};
    case 'INCREMENT_IMPORTED':
      return {
        ...state,
        imported: state.imported + 1,
        progress: Math.round(((state.imported + 1) / state.total) * 100),
      };
    default:
      return state;
  }
}

interface UseImportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (record: any) => Promise<void>;
}

export default function useImport({action}: UseImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [json, setJson] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [progressState, dispatchProgress] = useReducer(progressReducer, {
    total: 0,
    imported: 0,
    progress: 0,
  });

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setFile(event.target.files[0]);

    // const file = event.target.files[0];
    // const csv = await readFileAsText(file);
    // const json = Papa.parse(csv, {header: true});
    //
    // if (json.errors.length > 0) {
    //     setErrors(json.errors);
    // }
    //
    // await importJsonRecords(json.data);
    //
    // console.log(csv);
    // console.log(json);
  }

  async function onParseFile(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (file === null) {
      alert('You must select a file before parsing it!');

      return;
    }

    setLoading(true);

    const csv = await readFileAsText(file);
    const jsonResponse = Papa.parse(csv, {header: true});

    setJson(jsonResponse.data);

    if (jsonResponse.errors.length > 0) {
      setErrors(jsonResponse.errors);
    }

    setLoading(false);
  }

  async function importJsonRecords(json: unknown[]) {
    // setTotal(json.length);
    dispatchProgress({type: 'SET_TOTAL', total: json.length});
    setLoading(true);

    for (const record of json) {
      await action(record);

      // setImported((prev) => prev + 1);
      dispatchProgress({type: 'INCREMENT_IMPORTED'});
    }

    setLoading(false);
  }

  async function onImportRecords(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    await importJsonRecords(json);
  }

  // useEffect(() => {
  //   setProgress(Math.round((imported / total) * 100));
  // }, [total, imported]);

  return {
    onFileChange,
    onParseFile,
    onImportRecords,
    file,
    errors,
    json,
    total: progressState.total,
    imported: progressState.imported,
    progress: progressState.progress,
    loading,
  };
}
