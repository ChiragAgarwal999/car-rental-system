// components/LoginCTA.jsx
import { useRouter } from 'next/router';

export default function LoginCTA() {
  const router = useRouter();

  return (
    <section className="bg-blue-50 my-10 p-6 rounded-xl text-center shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to ride?</h2>
      <p className="text-gray-600 mb-6">Login or sign up now to book your favorite car in seconds.</p>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => router.push('/auth')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/auth')}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100 transition"
        >
          Register
        </button>
      </div>
    </section>
  );
}
