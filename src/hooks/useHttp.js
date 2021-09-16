import { useState } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);

    const sendRequest = async (requestOptions, callback) => {
        try {
            const response = await fetch(requestOptions.url, requestOptions.params ?? {});
            const data = await response.json();
            if (!response.ok) {
                console.log(response)
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