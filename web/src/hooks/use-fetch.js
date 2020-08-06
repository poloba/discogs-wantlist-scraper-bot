import React from 'react';

const useFetch = (request, payload) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let isMounted = true;
        setError(null);
        const abortController = new AbortController();

        (async () => {
            setLoading(true);
            const response = await fetch(process.env.API_URL + request, {
                ...payload,
                signal: abortController.signal,
            }).catch((err) => {
                err.code !== 20 && setError(err);
            });

            if (response && isMounted) {
                if (response.status >= 400 && response.status < 600) {
                    setError(response);
                } else {
                    setData(await response.json());
                }
            }
            setLoading(false);
        })();

        const clean = () => {
            isMounted = false;
            abortController.abort();
        };
        return clean;
    }, [request, payload]);

    return [data, loading, error];
};

export default useFetch;
