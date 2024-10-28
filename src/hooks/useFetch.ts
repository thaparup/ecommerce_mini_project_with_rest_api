import { error } from "console";
import { useEffect, useState } from "react";

export default function useFetch<ResponseOject>(url: string) {
  const [data, setData] = useState<ResponseOject | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: ResponseOject = await response.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    callApi();
  }, [skip]);
  return { data, loading, error, skip, setData, setSkip };
}
