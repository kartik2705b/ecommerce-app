import React, { useEffect, useState } from "react";

export const useFetch = <T = any>(url: string, onRender: boolean = false) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then((output) => output.json() as T)
      .then((finalData) => {
        setData(finalData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (onRender) {
      fetchData();
    }
  });

  return { data, loading, error, fetchData };
};

export default useFetch;
