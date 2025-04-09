import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:4003/api/login', { email, password });
      setOtpSent(true);
      setSuccessMessage(response.data.msg);
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:4003/api/verify-login-otp', { email, otp });
      setSuccessMessage(response.data.msg);
      
      
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);

      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError(error.response?.data?.msg || 'OTP verification failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjItMDQ3LWtxOTJ3eDl5LmpwZw.jpg')] bg-cover">
      <div className="w-full max-w-4xl p-4">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden">
          
          <div className="w-full md:w-1/2 bg-white/90 p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
            <div className="flex justify-center gap-4 mb-6">
              {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, index) => (
                <button
                  key={index}
                  className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="text-lg text-gray-600" />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mb-6">
              or use your email password
            </p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            <form onSubmit={otpSent ? handleVerifyOtp : handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
              />
              {!otpSent && (
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-green-600 transition-colors"
              >
                {otpSent ? 'Verify OTP' : 'SIGN IN'}
              </button>
            </form>
            <div className="text-right mt-4">
              <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                Forget Your Password?
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 bg-green-600 p-8 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="text-center mb-8 text-white/90">
              Register with your personal details to use all of site features
            </p>
            <button 
              className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-green-600 transition-colors uppercase tracking-wide"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



