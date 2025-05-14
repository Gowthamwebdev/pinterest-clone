import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postState } from '../types/postTypes';
import apiClient from '../api/apiClient';
import MasonryGrid from './home/MasonryGrid';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('query');
  const [results, setResults] = useState<postState[]>([]);

  useEffect(() => {
    if (query) {
      apiClient
        .get(`/posts/search?query=${query}`)
        .then((res) => setResults(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Results for "{query}"</h2>
      <MasonryGrid posts={results} />
    </div>
  );
};

export default SearchResults;
