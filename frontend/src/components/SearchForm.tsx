import { Loader2, MapPin, Search } from "lucide-react";
import React from "react";

type SearchFormProps = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchNearestExit: () => void;
};

export default function SearchForm({
  inputValue,
  setInputValue,
  loading,
  setLoading,
  searchNearestExit,
}: SearchFormProps) {
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのページリロードを防ぐ
    setLoading(true);
    searchNearestExit();
    await new Promise((resolve) => setTimeout(resolve, 1500)); // APIコールのシミュレーション
    setInputValue("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter destination address"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Find Nearest Station
          </>
        )}
      </button>
    </form>
  );
}
