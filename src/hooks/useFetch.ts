import { api } from "@/utils/axios";
import React, { useEffect, useState } from "react";

interface RequestParams {
  url: string;
  method?: string;
  onRender?: boolean;
}

export const useFetch = <T = any>({
  url,
  method = "GET",
  onRender = true,
}: RequestParams) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const fetchData = async () => {
    // if (!onRender) return;

    setLoading(true);
    try {
      console.log("request stared");
      const output = (
        await api.request({
          url: url,
          method: method,
        })
      ).data as T;
      // console.log(output);
      setData(output);
      console.log("request end");
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onRender) {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetch;
