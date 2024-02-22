import Link from 'next/link';

function Footer() {
  return (
    <footer
      aria-label="Site Footer"
      className="fixed bottom-0 z-40 w-full bg-white"
    >
      <div className="mx-auto p-5">
        <ul className="flex justify-center gap-6">
          <li>
            <a
              href="https://github.com/AleksaGavric/FluentTypeAI"
              aria-label="GitHub"
              rel="noreferrer"
              target="_blank"
              className="text-xs text-gray-700 transition hover:text-gray-700/75"
            >
              <svg
                className="h-6 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <p className=" text-xl text-gray-700 transition hover:text-gray-700/75">
              |
            </p>
          </li>

          <li>
            <button
              title="Here's how to use the product..."
              aria-label="Information"
              className="flex items-center justify-center focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="h-6 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
          </li>

          <li>
            <p className="text-xl text-gray-700 transition hover:text-gray-700/75">
              |
            </p>
          </li>

          <li>
            <Link
              className="text-xs text-gray-700 transition hover:text-gray-700/75"
              href="https://s.surveyplanet.com/k6vwmtct"
            >
              Feedback?
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
