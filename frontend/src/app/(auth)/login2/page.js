import Image from 'next/image'
import React from 'react'

function Login2() {
  return (
    <div className="min-h-screen px-20 flex justify-between items-end max-md:flex-wrap max-md:items-center max-md:justify-center max-md:gap-10">
    <div className="left self-center flex flex-col gap-5 mt-9">
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
        Login Code
      </h1>

      <p
        style={{
          "fontFamily":"Cyntho Next","fontSize":"22px","fontWeight":"400","lineHeight":"32px","textUnderlinePosition":"from-font","textDecorationSkipInk":"none",
        color:"gray"
      }}
      >
        Enter the authentication code we sent at*******896
      </p>

      <input disabled value="+2010202030" style={{
        width:"350px",
        padding: "10px",
        marginBottom: "20px",
        marginTop: "20px",
        fontSize: "18px",
        border: "2px #00000033 solid",
        outline: "none",
        borderRadius: "5px",
        
      }} type="phone" placeholder="phone number" />

<input style={{
        width:"350px",
        padding: "10px",
        marginBottom: "20px",
        marginTop: "20px",
        fontSize: "18px",
        border: "2px #00000033 solid",
        outline: "none",
        borderRadius: "5px",
      }} type="phone" placeholder="Login 
      code" />

  </div>
   <div className="bottom mt-10">
   <button
   className="hover:opacity-85 hover:scale-125"
        style={{
          borderRadius: "5px",
          border: " 2px #FFBB15 solid",
          padding: "6px 10px",
          fontSize: "18px",
          width: "350px",
        }}
      >
        Submit
      </button>

    
   </div>
    </div>


    <div className="right self-center">
      <Image
        alt="cuate"
        src="/images/login2/pana.png"
        height={500}
        width={500}
      />
    </div>
  </div>
  )
}

export default Login2