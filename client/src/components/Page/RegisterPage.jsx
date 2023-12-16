import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="your@email.com" />
            <input type="password" placeholder="Password" />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already have an account?{" "}
              <Link className="text-red-500 font-bold" to="/login">
                Login Now!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
