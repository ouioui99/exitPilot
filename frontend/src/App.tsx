import { Suspense, use, useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import Result from "./components/Result";

export type fetchResultDataType = {
  station: { name: string };
  exit: { number: string };
  distance: number;
};

const fetchData = async (): Promise<{ ok: string }[]> => {
  try {
    const response = await axios.get<{ ok: string }[]>(
      "http://localhost:8787/test"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

const fetchResultData = async (
  searchValue: string
): Promise<fetchResultDataType | null> => {
  try {
    const response = await axios.post<fetchResultDataType>(
      "http://localhost:8787/search-exit",
      { searchValue: searchValue }
    );

    return response.data;
    //TODO catch時の返り値
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

const Test = ({
  messagesPromise,
}: {
  messagesPromise: Promise<{ ok: string }[]>;
}) => {
  const messages = use(messagesPromise);
  return (
    <>
      {messages.map((message, i) => (
        <li key={i}>{message.ok}</li>
      ))}
    </>
  );
};

function App() {
  const messagesPromise = fetchData();
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<fetchResultDataType | null>(
    null
  );

  const searchNearestExit = async (): Promise<{ ok: string }[]> => {
    fetchResultData(inputValue).then((result) => {
      setSearchResult(result);
      console.log({ result });
    });

    try {
      const response = await axios.get<{ ok: string }[]>(
        "http://localhost:8787/test"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Find Nearest Station
          </h2>
          <SearchForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            loading={loading}
            setLoading={setLoading}
            searchNearestExit={searchNearestExit}
          ></SearchForm>

          {searchResult && <Result searchResult={searchResult}></Result>}
        </div>
      </div>
    </div>
  );
}

export default App;
