import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:4003/api/send-otp', { email });
      setOtpSent(true);
      setSuccessMessage(response.data.msg);
    } catch (error) {
      setError(error.response?.data?.msg || 'Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:4003/api/verify-otp', { email, otp });
      setOtpVerified(true);
      setSuccessMessage(response.data.msg);
    } catch (error) {
      setError(error.response?.data?.msg || 'Error verifying OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (!otpVerified) {
      setError('Please verify OTP first');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4003/api/signup', { name, email, password, otp });
      setSuccessMessage(response.data.msg);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.msg || 'Error during signup. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjItMDQ3LWtxOTJ3eDl5LmpwZw.jpg')] bg-cover">
      <div className="w-full max-w-4xl p-4">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden">

          <div className="w-full md:w-1/2 bg-white/90 p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
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
              or use your email for registration
            </p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold tracking-wide hover:bg-blue-600 transition-colors"
                >
                  Send OTP
                </button>
              ) : !otpVerified ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full p-3 rounded-lg bg-green-50 border-none outline-none"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button
                    type="
button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold tracking-wide hover:bg-blue-600 transition-colors"
                  >
                    Verify OTP
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-green-600 transition-colors"
                >
                  SIGN UP
                </button>
              )}
            </form>
          </div>
          
          
          <div className="w-full md:w-1/2 bg-green-600 p-8 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-center mb-8 text-white/90">
              To keep connected with us please login with your personal info
            </p>
            <button 
              className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-green-600 transition-colors uppercase tracking-wide"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

