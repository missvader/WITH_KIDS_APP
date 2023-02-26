import {useContext} from "react";
import {NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Logo from '../assets/withKidsLogo.png';
import Background from "../assets/backgroundApp.png"
export default function Signup(){
  
  const {
    signUp, 
    username,
    setUsername, 
    password,
    setPassword,
    email,
    setEmail,
    error, 
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
    if(error) {
      console.log(error)
    }
    setEmail("");
    setPassword("");
    setUsername("");
  }
  return(
      <div className="  flex flex-col grid justify-items-center md:w-2/3 lg:w-3/5 xl:w-2/5 m-auto static h-screen w-screen " >
          <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
        <div className="container absolute flex flex-col ">
          <div className=" ">
            <div className="flex justify-center mt-7">
              <img 
              alt="logo"
              className="logo"
              src={Logo}
              />
            </div>
            <h2 className="mt-4 text-center text-lg  text-lila lg:text-xl lg:font-medium">
            REGISTRE
            </h2>
            <p className="mt-1 text-center text-sm font-medium text-gray-600 lg:text-lg">
              ¿Ja estàs registrat?
            <NavLink to="/login" className="font-medium text-lila hover:text-purple-800 hover:text-lg">
              &nbsp;Identifica´t 
            </NavLink>
            </p>
          </div>
          <form className="space-y-4 mt-2 form flex flex-col justify-items-end grid" onSubmit={handleSubmit}>
            <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
            type="text"
            placeholder="Username"
            required
            className={
              error
                ? "input input-bordered input-error "
                : "input input-bordered  text-gray-400"
              }   
          
            />
            <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            className={
              error
                ? "input input-bordered input-error "
                : "input input-bordered  text-gray-400"
              }
            />
            <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            minLength="6"
            required
            className={
              error
                ? "input input-bordered input-error "
                : "input input-bordered text-gray-400"
              }
            />
            <button
            type="submit"
            className="btn  w-28 h-8 bg-lila my-8  hover:btn-secondary-focus lg:w-36"
            >
            ENVIA
            </button>
          </form>
        </div> 
      </div>
  )
}
