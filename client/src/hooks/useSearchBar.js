import { useCallback, useRef, useState } from "react";
import { searchProducts } from "../services/search.service";

export const useSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const timerRef = useRef(null);

  const fetchResults = useCallback(async (value) => {
    if (!value) {
      setResults([]);
      return;
    }
    const data = await searchProducts(value);
    setResults(data);
  }, []);

  const onChange = useCallback(
    (value) => {
      setQuery(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        fetchResults(value);
      }, 300);
    },
    [fetchResults]
  );

  return { query, results, setResults, onChange };
};
