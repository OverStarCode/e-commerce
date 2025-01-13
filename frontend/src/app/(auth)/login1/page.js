

'use client'
import Image from "next/image";
import { RecaptchaVerifier,getAuth, signInWithPhoneNumber } from "firebase/auth";



import { useEffect ,useState} from "react";
 

import {App} from '@/firebase'

function Login1() {

 const [phoneNumber,setPhoneNumber] = useState("+201182441975");

 const [otp,setOtp] = useState(null);

 const [comfirmationResult,setComfirmationResult] = useState(null);

 const [otpSend,setOtpSend] = useState(false);

 const auth = getAuth(App);

 async function verfiryRecaptcha(auth){
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth, 'recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
    }
  },[auth]);
 }
useEffect(() => {
 
  verfiryRecaptcha(auth);
 
 }, [auth])

const handleSendCode = async ()=>{
  const appVerifier = window.recaptchaVerifier;

  await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
   .then((confirmationResult) => {
      setOtpSend(true);
      setComfirmationResult(confirmationResult);

      setOtpSend(true)
      setPhoneNumber("");
    })
   .catch((error) => {
      console.error("Sign-in with phone number failed: ", error);
    });
}



// const handleMatchotp = async (code) => {
 
//   try{
//    await comfirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;

//       console.log(user);
//       // ...
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });
    
//   }catch(error) {
//     console.error("Verification code failed: ", error);
  
//   }
// }
 

  return (
    <div className="min-h-screen px-20 flex justify-between items-end max-md:flex-wrap max-md:items-center max-md:justify-center max-md:gap-10">
      
      <div className="left self-center flex flex-col gap-5">
        <Image alt="logo" src="/images/logo.png" height={200} width={233} />

        <div className="center mt-7">
          <h1
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "35px",
              fontWeight: "600",
              lineHeight: "45px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Welcome!
          </h1>

          <p
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "gray",
            }}
          >
            Enter the authentication code we sent at*******896
          </p>

          {!otpSend&&           <div id="recaptcha-container"></div>  }
          <input
            style={{
              width: "350px",
              padding: "10px",
              marginBottom: "20px",
              marginTop: "20px",
              fontSize: "18px",
              border: "2px #00000033 solid",
              outline: "none",
              borderRadius: "5px",
            }}
       
            type="tel"
            placeholder="phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="bottom mt-10">
          <button
          onClick={handleSendCode}
            className="hover:opacity-85 hover:scale-125"
            style={{
              borderRadius: "5px",
              border: " 2px #FFBB15 solid",
              padding: "6px 10px",
              fontSize: "18px",
              width: "350px",
            }}
          >
            Next
          </button>


          <p
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              marginTop: "15px",
              paddingLeft: "10px",
              color: "gray",
            }}
          >
            Do Not have Account?
            <a
              style={{
                color: "#EC362B",
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "32px",
                display: "inline-block",
                paddingLeft: "4px",
              }}
              className="hover:opacity-85 hover:underline hover:scale-110 hover:px-3"
              href="/register"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      <div className="right">
        <Image
          alt="cuate"
          src="/images/login1/cuate.png"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
}

export default Login1;
