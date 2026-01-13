import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from '../store/userStore.js'

function Login() {
  const [error,setError]=useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
 const userStore =useUserStore((state)=> state);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const user=await userStore.login({email:formData.email, password:formData.password})

    if(user?.success){
      navigate("/dashboard")
    }
   else
   {
    setError(userStore.loginerror)
   }

 
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="rounded-lg   bg-white text-card-foreground shadow-sm w-full max-w-md">
        {/*JSON.stringify(userStore?.error)*/}
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="flex justify-center mb-4">
            <svg className="lucide lucide-book-open h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <div className="tracking-tight text-2xl font-bold">
            Library Manager System
          </div>
          <div className="text-sm text-muted-foreground">
           Sign in to your account to continue
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (//&& is for if not null(false) display the error
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        </div>

        <div className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit}>
          
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 w-0">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="peer w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password"className="block text-sm font-semibold text-gray-800 mb-2 w-0">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="peer w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          

          
            <button
              type="submit"
              disabled={userStore.loading}
              className="w-full rounded-sm bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              {userStore.loading ? "Signing in..." : "Sign in"}
              
            </button>
          
        </form>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2">Test Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Admin:</span><span>admin / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>Librarian:</span><span>librarian / librarian123</span>
              </div>
          </div>
        </div>
        </div>
      </div>

        <div
          role="region"
          aria-label="Notifications (F8)"
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
>
        <ol className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" tabIndex={-1}></ol>
</div>


    </div>
    </>
  );
}

export default Login;
