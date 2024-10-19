
export default function Rule() {
  return (
    <div className= 'dark'>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-500">
        <header className="p-5 bg-gray-100 dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto flex text-center justify-center items-center">
            <h1 className="text-2xl text-center  font-bold">Admin Page</h1>

          </div>
        </header>

        <main className="container mx-auto p-5">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Rules</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Rule 1: Always respect user privacy.</li>
              <li>Rule 2: Admins must follow community guidelines.</li>
              <li>Rule 3: Ensure content accuracy before publishing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Notes from Author</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This page is designed to help administrators manage content more
              effectively. Please ensure all actions align with the core
              principles outlined above.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
