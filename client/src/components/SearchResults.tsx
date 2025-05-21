import { useEffect, useState, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postType } from '@type/postTypes';
import apiClient from '@api/apiClient';
import MasonryGrid from './home/MasonryGrid';
import SpinningLoader from './ui/loader/SpinningLoader';
import useSnackBar from '@context/SnackBarContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('query');
  const navigate = useNavigate();
  const [results, setResults] = useState<postType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const showSnackBar = useSnackBar();

  useEffect(() => {
    if (query) {
      startTransition(async () => {
        try {
          const response = await apiClient.get(
            `/posts/search?query=${encodeURIComponent(query)}`,
          );
          setResults(response.data.data || []);
          setError(null);
        } catch (error) {
          const errorMsg =
            error && typeof error === 'object' && 'message' in error
              ? (error as { message: string }).message
              : 'An unexpected error occurred';
          showSnackBar(errorMsg, 'error');
          setResults([]);
          setError(errorMsg);
        }
      });
    } else {
      setResults([]);
      setError(null);
      navigate('/home');
    }
  }, [query, showSnackBar, navigate]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinningLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Results for "{query}"</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Please enter a search term.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Results for "{query}"</h2>
      {results.length > 0 ? (
        <MasonryGrid posts={results} isOwnProfile={false} />
      ) : (
        <p className="text-gray-600">No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;
