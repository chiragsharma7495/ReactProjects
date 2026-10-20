import { useEffect, useState } from "react";

export default function UserDirectory(){
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState('');
    const[retryCount, setRetryCount] = useState(0);
    const[search, setSearch] = useState('');
    const[selectedUserId, setSelectedUserId] = useState(null);

    const filteredUsers = users.filter((user) => {
        const searchText = search.trim().toLowerCase();

        return(
            user.name.toLowerCase().includes(searchText)||
            user.email.toLowerCase().includes(searchText)
        );
    });

    const selectedUser = users.find(
    (user) => user.id === selectedUserId
    );

    function handleRetry(){
        setRetryCount((prevCount) => prevCount + 1);
    }

    useEffect(() => {

        const controller = new AbortController();

        async function fetchUsers(){
            setLoading(true);
            setError('');
            try{
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users',
                    { signal: controller.signal }
                );

                if(!response.ok){
                    throw new Error("Failed to Fetch users");
                }

                const data = await response.json();
                
                if(!controller.signal.aborted){
                setUsers(data);
                }

            }catch{
                 if (!controller.signal.aborted) {
                    setError('Unable to load users. Please try again.');
                }

            }finally{
               if (!controller.signal.aborted) {
                setLoading(false);
                    }
            }
        }
        fetchUsers();

        return(() => {
            controller.abort();
        })
    },[retryCount]);

    return(
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Directory
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  User Directory
                </h1>
                <p className="mt-2 max-w-xl text-slate-600">
                  Search the directory and view details for any user.
                </p>
              </div>

              {!error && (
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={loading}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Refreshing...' : 'Refresh Users'}
                </button>
              )}
            </div>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <label htmlFor="user-search" className="mb-2 block text-sm font-medium text-slate-700">
                Search users
              </label>
              <input
                id="user-search"
                type="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm" role="status">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                <p className="font-medium text-slate-700">Loading users...</p>
                <p className="mt-1 text-sm text-slate-500">Fetching the latest directory data.</p>
              </div>
            ): error ?(
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center" role="alert">
                <p className="font-semibold text-red-800">Unable to load users</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
                </div>
            ): users.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="font-medium text-slate-700">No users found.</p>
                <p className="mt-1 text-sm text-slate-500">Try refreshing the directory.</p>
              </div>
            ): (
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-600">
                        Users found: <span className="font-bold text-slate-900">{filteredUsers.length}</span>
                      </p>
                    </div>

                  {filteredUsers.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                      <p className="font-medium text-slate-700">No matching users found.</p>
                      <p className="mt-1 text-sm text-slate-500">Try a different name or email address.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {filteredUsers.map((user) => (
                        <article key={user.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                            {user.name.charAt(0)}
                          </div>
                          <h2 className="text-lg font-semibold text-slate-900">{user.name}</h2>
                          <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>

                          <button
                            type="button"
                            onClick={() => setSelectedUserId(user.id)}
                            className="mt-5 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            View Details
                          </button>
                        </article>
                      ))}
                    </div>
                  )}
                  </div>

                  {selectedUser && (
                    <aside className="h-fit rounded-2xl border border-indigo-100 bg-indigo-50 p-5 lg:sticky lg:top-6">
                      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Selected User</p>
                      <h2 className="mt-3 text-xl font-bold text-slate-900">{selectedUser.name}</h2>
                      <dl className="mt-4 space-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-slate-500">ID</dt>
                          <dd className="text-slate-800">{selectedUser.id}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-slate-500">Email</dt>
                          <dd className="break-words text-slate-800">{selectedUser.email}</dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        onClick={() => setSelectedUserId(null)}
                        className="mt-6 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Clear Selection
                      </button>
                    </aside>
                  )}
                </div>
            )}
          </section>
        </main>
    )
}