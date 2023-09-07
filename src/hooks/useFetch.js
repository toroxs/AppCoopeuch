import { useState, useCallback } from "react";
import axios from "axios";

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeFetch = useCallback(
        async ({
            payload = null,
            methodOverride = null,
            urlOverride = null,
        } = {}) => {
            setLoading(true);
            setError(null);
            setData(null);
           
            try {
                const response = await axios({
                    url: urlOverride || url,
                    method: methodOverride || method,     
                    auth: {
                        username: 'user',
                        password: '1234'
                      },               
                    data: payload,
                });
                console.log(response);
                setData(response.data);
            } catch (err) {                
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [url, method]
    );

    return { data, loading, error, executeFetch };
};