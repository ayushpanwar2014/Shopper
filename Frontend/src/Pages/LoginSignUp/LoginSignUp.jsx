import { useState } from "react"
import "./LoginSignUp.css"

const LoginSignUp = () => {

  const [Login, setLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()

    let responseData;
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await fetch('http://localhost:8800/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else {
      alert(responseData.error)
    }
    
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    let responseData;
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    await fetch('http://localhost:8800/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/')
    }
    else {
      alert(responseData.error)
    }

  }

  return (<>
    {
      Login ? (
        <>

          <div className='loginsignup'>
            <div className="loginsignup-container">
              <h1>Sign Up</h1>
              <form className="loginsignup-fields" onSubmit={handleRegister}>
                <input required name="username" type="text" placeholder='Your Name' />
                <input required name="email" type="email" placeholder='Email' />
                <input required name="password" type="password" placeholder='Password' />
                <button>Continue</button>
              </form>
              <div className="loginsignup-login">
                <p >Already have an account? <span onClick={() => setLogin((prev) => !prev)}>Login here</span></p>
                <div className="loginsignup-agree">
                  <input required type="checkbox" name='' id='' />
                  <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
              </div>
            </div>
          </div>

        </>
      ) :
        (
          <>

            <div className='loginsignup'>
              <div className="loginsignup-container">
                <h1>Log In</h1>
                <form className="loginsignup-fields" onSubmit={handleLogin}>
                  <input required name="email" type="email" placeholder='Email' />
                  <input required name="password" type="password" placeholder='Password' />
                  <button>Continue</button>
                </form>
                <div className="loginsignup-login">
                  <p >Don't have an account? <span onClick={() => setLogin((prev) => !prev)}>SignUp here</span></p>
                  <div className="loginsignup-agree">
                    <input type="checkbox" name='check' id='' required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

    }
  </>
  )
}

export default LoginSignUp
