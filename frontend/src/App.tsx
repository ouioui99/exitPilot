import { Suspense, use, useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import { MapPin, Search, Loader2 } from "lucide-react";

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
``;
function App() {
  const messagesPromise = fetchData();
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const searchNearestExit = () => {};

  const [formData, setFormData] = useState<FormData | null>(null);

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
          ></SearchForm>

          {/* {result && (
            <div className="mt-6 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
                Closest Station
              </h3>
              <div className="space-y-2">
                <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-2xl">🚇</span>
                  <span className="font-medium">{result.station.name}</span>
                </p>
                <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-2xl">🚪</span>
                  <span>Exit {result.exit.number}</span>
                </p>
                <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-2xl">📏</span>
                  <span>{result.distance.toFixed(2)} km</span>
                </p>
              </div>
            </div>
          )} */}
        </div>
        <Suspense fallback={<div>loading...</div>}>
          <Test messagesPromise={messagesPromise} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
