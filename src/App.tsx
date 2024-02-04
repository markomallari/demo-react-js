import React, { useEffect, useState } from "react";
import { fetchUsers } from "./services/";
import "./App.css";
import { User } from "./interfaces/UserInterface";
import { setUserStore, getUserStore, removeUserStore } from "./utils/storage";

const App = () => {
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = getUserStore();
    storedUser !== null ? setUser(JSON.parse(storedUser)) : getRandomUser();
  }, []);

  const getRandomUser = () => {
    setIsLoading(true);
    removeUserStore();
    fetchUsers().then((res) => {
      const { data } = res;
      setUser(data?.results);
      setUserStore(JSON.stringify(data?.results));
      setIsLoading(false);
    });
  };

  return (
    <div className="App">
      {user.map((user) => (
        <div
          className="h-screen text-white bg-gray-700 bg-gray-200 pt-12"
          key={user?.id?.value}
        >
          <div className="max-w-sm mx-auto bg-white bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {isLoading ? (
              <div className="px-4 pb-6 animate-pulse">
                <div className="text-center my-3">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white bg-slate-700 mx-auto my-6"
                    src=""
                    alt=""
                  />
                  <div className="py-2">
                    <h3 className="h-6 bg-slate-700 rounded mb-3 mx-14"></h3>
                    <div className="h-3 bg-slate-700 rounded mx-14"></div>
                  </div>
                </div>
                <div className="flex gap-2 px-2">
                  <button
                    className="flex-1 rounded-full border-2 border-gray-400 border-gray-700 font-semibold text-white px-4 py-2"
                    disabled
                  >
                    Processing...
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white border-gray-800 mx-auto my-4"
                    src={user?.picture?.large}
                    alt={`${user?.name?.first} ${user?.name?.last}`}
                  />
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 text-white mb-1">
                      {user?.name?.first} {user?.name?.last}
                    </h3>
                    <div className="inline-flex text-gray-700 text-gray-300 items-center">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 px-2">
                  <button
                    onClick={() => {
                      getRandomUser();
                    }}
                    className="flex-1 rounded-full border-2 border-gray-400 border-gray-700 font-semibold text-black text-white px-4 py-2"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
