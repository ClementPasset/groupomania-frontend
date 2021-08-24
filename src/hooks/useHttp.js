import { useState } from "react";

const useHttp = (requestOptions, callback) => {
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        try {
            const response = await fetch(requestOptions.url, requestOptions.params ?? {});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error ? data.error.name : data.message)
            }
            callback(data);
        }
        catch (err) {
            setError(err.message || 'Une erreur a été rencontrée.');
        }
    }

    return { error, sendRequest };
}

export default useHttp;