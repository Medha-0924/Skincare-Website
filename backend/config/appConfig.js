module.exports = {
    port: 4003,
    mongoURI: 'mongodb://127.0.0.1:27017/skincare',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    razorpay: {
      key_id: 'rzp_test_jnFll4vBKCwPho',
      key_secret: 'rj1C0dsKibu56PiiOhUqdGFp'
    },
    email: {
      service: 'Gmail',
      auth: {
        user: 'chomalmedha@gmail.com',
        pass: 'sebl epvb gzeg xako'
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    jwtSecret: 'your_jwt_secret_key_here',
  };
  
  
