

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, User, ShoppingBag, ArrowRight } from 'lucide-react';
// import { Link,useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Navbar() {
//   const [isNavActive, setIsNavActive] = useState(false);
//   const [isHeaderActive, setIsHeaderActive] = useState(false);
//   const [isHeaderHide, setIsHeaderHide] = useState(false);
//   const [cartItemsCount, setCartItemsCount] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const lastScrolledPos = React.useRef(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsHeaderActive(true);
//       } else {
//         setIsHeaderActive(false);
//       }

//       if (lastScrolledPos.current >= window.scrollY) {
//         setIsHeaderHide(false);
//       } else {
//         setIsHeaderHide(true);
//       }

//       lastScrolledPos.current = window.scrollY;
//     };

   
//     const fetchCartCount = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//           const response = await axios.get(`http://localhost:4003/api/cart/${userId}`);
//           const itemCount = response.data.items.reduce((total, item) => total + item.quantity, 0);
//           setCartItemsCount(itemCount);
//         }
//       } catch (error) {
//         console.error('Error fetching cart count:', error);
//       }
//     };


//     window.addEventListener('scroll', handleScroll);
//     fetchCartCount(); // Fetch initial cart count

//     const token = localStorage.getItem('userToken');
//     setIsLoggedIn(!!token);

    
//     const intervalId = setInterval(fetchCartCount, 7000);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       clearInterval(intervalId);
//     };
//   }, []);

//   const toggleNavbar = () => setIsNavActive(!isNavActive);


//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:4003/api/logout');
//       localStorage.removeItem('userToken');
//       localStorage.removeItem('userId');
//       localStorage.removeItem('username');
//       delete axios.defaults.headers.common['Authorization'];
//       setIsLoggedIn(false);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <>
//       <header className={`header ${isHeaderActive ? 'active' : ''} ${isHeaderHide ? 'header-hide' : ''}`} data-header>
//         <div className="alert">
//           <div className="container">
//             <p className="alert-text">Answers for all your skin problems</p>
//           </div>
//         </div>

//         <div className="header-top">
//           <div className="container">
//             <button className="nav-open-btn" aria-label="open menu" onClick={toggleNavbar}>
//               <span className="line line-1"></span>
//               <span className="line line-2"></span>
//               <span className="line line-3"></span>
//             </button>

//             <div className="input-wrapper">
//               <input type="search" name="search" placeholder="Search product" className="search-field" />
//               <button className="search-submit" aria-label="search">
//                 <Search size={24} />
//               </button>
//             </div>

//             <a href="/" className="logo">
//               <img src="./assets/images/logo.png" width="179" height="26" alt="Glowing" />
//             </a>

//             <div className="header-actions">
//               <button className="header-action-btn" aria-label="user">
//                 <a href="/signin-login">
//                   <User size={24} />
//                 </a>
//               </button>

//               <button className="header-action-btn" aria-label="cart item">
//                 <data className="btn-text" value="0">RS.0.00</data>
//                 <Link to="/cart">
//                   <ShoppingBag size={24} />
//                 </Link>
//                 <span className="btn-badge">{cartItemsCount}</span>
//               </button>
//             </div>

//             <nav className="navbar">
//           <ul className="navbar-list">
//             <Link to="/" className='navbar-a has-after'>Home</Link>
//             {['Collection', 'Shop', 'Offer', 'Blog'].map((item, index) => (
//               <li key={index}>
//                 <a href={`#${item.toLowerCase()}`} className="navbar-a has-after">{item}</a>
//               </li>
//             ))}
//             <Link to="/form" className='navbar-a has-after'>Quiz</Link>
//             {isLoggedIn ? (
//               <li>
//                 <button onClick={handleLogout} className='navbar-a has-after'>Logout</button>
//               </li>
//             ) : (
//               <>
//                 <Link to="/login" className='navbar-a has-after'>Login</Link>
//                 <Link to="/signup" className='navbar-a has-after'>Signup</Link>
//               </>
//             )}
//           </ul>
//         </nav>
//           </div>
//         </div>
//       </header>

//       <AnimatePresence>
//         {isNavActive && (
//           <motion.div
//             className="sidebar"
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             transition={{ type: 'tween' }}
//           >
//             <div className="mobile-navbar" data-navbar>
//               <div className="wrapper">
//                 <a href="/" className="logo">
//                   <img src="./assets/images/logo.png" width="179" height="26" alt="Glowing" />
//                 </a>

//                 <button className="nav-close-btn" aria-label="close menu" onClick={toggleNavbar}>
//                   <ArrowRight size={24} />
//                 </button>
//               </div>

//               <ul className="navbar-list">
//                 {['Home', 'Collection', 'Shop', 'Offer', 'Blog'].map((item, index) => (
//                   <li key={index}>
//                     <a href={`#${item.toLowerCase()}`} className="navbar-a" onClick={toggleNavbar}>{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="overlay" onClick={toggleNavbar}></div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default Navbar;





import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, ArrowRight ,Clock} from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isHeaderHide, setIsHeaderHide] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lastScrolledPos = React.useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }

      if (lastScrolledPos.current >= window.scrollY) {
        setIsHeaderHide(false);
      } else {
        setIsHeaderHide(true);
      }

      lastScrolledPos.current = window.scrollY;
    };

   
    const fetchCartCount = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:4003/api/cart/${userId}`);
          const itemCount = response.data.items.reduce((total, item) => total + item.quantity, 0);
          setCartItemsCount(itemCount);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };


    window.addEventListener('scroll', handleScroll);
    fetchCartCount(); // Fetch initial cart count

    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);

    
    const intervalId = setInterval(fetchCartCount, 7000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const toggleNavbar = () => setIsNavActive(!isNavActive);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4003/api/logout');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      delete axios.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <header className={`header ${isHeaderActive ? 'active' : ''} ${isHeaderHide ? 'header-hide' : ''}`} data-header>
        <div className="alert">
          <div className="container">
            <p className="alert-text">Answers for all your skin problems</p>
          </div>
        </div>

        <div className="header-top">
          <div className="container">
            <button className="nav-open-btn" aria-label="open menu" onClick={toggleNavbar}>
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </button>

            <div className="input-wrapper">
              <input type="search" name="search" placeholder="Search product" className="search-field" />
              <button className="search-submit" aria-label="search">
                <Search size={24} />
              </button>
            </div>

            <a href="/" className="logo">
              <img src="./assets/images/logo.png" width="179" height="26" alt="Glowing" />
            </a>

            <div className="header-actions">
              <button className="header-action-btn" aria-label="user">
                <a href="/signin-login">
                  <User size={24} />
                </a>
              </button>

              <button className="header-action-btn" aria-label="cart item">
                <data className="btn-text" value="0">RS.0.00</data>
                <Link to="/cart">
                  <ShoppingBag size={24} />
                </Link>
                <span className="btn-badge">{cartItemsCount}</span>
              </button>
            </div>

            <nav className="navbar">
          <ul className="navbar-list">
            <Link to="/" className='navbar-a has-after'>Home</Link>
            {['Collection', 'Shop', 'Offer', 'Blog'].map((item, index) => (
              <li key={index}>
                <a href={`#${item.toLowerCase()}`} className="navbar-a has-after">{item}</a>
              </li>
            ))}
            <Link to="/form" className='navbar-a has-after'>Quiz</Link>
            {isLoggedIn ? (
              <>
              <Link to="/order-history" className="flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                Order History
              </Link>
              <li>
                <button onClick={handleLogout} className='navbar-a has-after'>Logout</button>
              </li>
              </>
            ) : (
              <>
                <Link to="/login" className='navbar-a has-after'>Login</Link>
                <Link to="/signup" className='navbar-a has-after'>Signup</Link>
              </>
            )}
          </ul>
        </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isNavActive && (
          <motion.div
            className="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
          >
            <div className="mobile-navbar" data-navbar>
              <div className="wrapper">
                <a href="/" className="logo">
                  <img src="./assets/images/logo.png" width="179" height="26" alt="Glowing" />
                </a>

                <button className="nav-close-btn" aria-label="close menu" onClick={toggleNavbar}>
                  <ArrowRight size={24} />
                </button>
              </div>

              <ul className="navbar-list">
                {['Home', 'Collection', 'Shop', 'Offer', 'Blog'].map((item, index) => (
                  <li key={index}>
                    <a href={`#${item.toLowerCase()}`} className="navbar-a" onClick={toggleNavbar}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overlay" onClick={toggleNavbar}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
