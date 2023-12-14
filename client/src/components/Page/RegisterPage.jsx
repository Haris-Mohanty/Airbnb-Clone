function RegisterPage() {
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
        <h1>Register</h1>
        <form className="max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" />
            <input type="password" placeholder="your@email.com" />
        </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
