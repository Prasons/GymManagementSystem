import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-light text-center mb-6">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-light text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-accent bg-primary text-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-light text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-accent bg-primary text-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-light text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-accent bg-primary text-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-light text-sm mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-3 border border-accent bg-primary text-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-light py-3 rounded-md hover:bg-light hover:text-primary transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
