import { useCallback, useEffect, useState } from "react";

async function sendHttp(url, configObj) {
  const response = await fetch(url, configObj);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, configObj, initialData) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        setError(null);

        const resData = await sendHttp(url, { ...configObj, body: data });

        setData(resData);
      } catch (error) {
        setError(
          error.message || "Something went wrong, failed to send request."
        );
      }
      setIsLoading(false);
    },
    [url, configObj]
  );

  useEffect(() => {
    if (
      (configObj && (configObj.method === "GET" || !configObj.method)) ||
      !configObj
    ) {
      sendRequest();
    }
  }, [sendRequest, configObj]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData
  };
}
