import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import Cookies from 'js-cookie';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login ,user } = useUser()
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Redirect to home if already logged in
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email",email)
    console.log("password",password)
    try {
      let res;
      if (isLogin) {
        console.log("email",email)
        res = await axios.post('/api/auth/login', { email, password });
      } else {
        console.log("password",password)

        res = await axios.post('/api/auth/register', { name, email, password });
      }
console.log("userData",res.data.user)
console.log("isLogin",isLogin)
      // Save user in context and set cookie (context handles it internally)
      login(res.data.user);
      toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
      router.push('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    }
  };


  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      toast.info('You are already logged in.');
      router.push('/');
    } else {
      setCheckingAuth(false); // show login form
    }
  }, []);

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-blue-700 font-semibold text-lg animate-pulse">
          Checking login status...
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </main>
  );
}
