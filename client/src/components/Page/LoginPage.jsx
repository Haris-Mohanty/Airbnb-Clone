import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" />
            <input type="password" placeholder="Password" />
            <button className="primary">Login</button>
            <div className="flex-center py-2 text-gray-500">
              Do not have an account yet? <Link className="text-red-500 font-bold" to="/register">Register Now</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
