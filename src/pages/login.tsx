import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';

const Login = () => (
  <div className="relative flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-teal-100 py-16">
    <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
        <div className="rounded-xl bg-white shadow-xl">
          <div className="p-6 sm:p-16">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/assets/logo.png"
                loading="lazy"
                height={2 * 29}
                width={2 * 146}
                alt="logo"
              />
            </div>
            <div className="mt-14 grid space-y-4">
              <button
                type="button"
                className="group h-12 rounded-full border-2 border-gray-300 px-6 transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                onClick={() => signIn('google', { callbackUrl: '/practice' })}
              >
                <div className="relative flex items-center justify-center space-x-4">
                  <img
                    src="/assets/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
              <p />
              <p />
              <p />
              <div className="mt-10 space-y-4 text-center text-gray-600 sm:-mb-8">
                <p className="text-sm">
                  By proceeding, you agree to our{' '}
                  <a href="/tos.txt" target="_blank">
                    Terms of Use
                  </a>{' '}
                  and our{' '}
                  <a href="/privacy.txt" target="_blank">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
