import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const[data,setData]=useState({
    username:"",
    email:"",
    password:""
  });
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {username,email,password}=data;
  const onchange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
  }
  const onsubmit=async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res=await fetch('/api/auth/signup',
        {
          method:'POST',
          headers:{'content-type':'application/json',
  
          },
          body:JSON.stringify(data),
        }
      );
      const data1=await res.json();
      console.log(data1);
      if(data1.success===false){
        setLoading(false);
        setError(data1.message);    
        return;
      }
      setLoading(false); 
      setError(null);
      navigate('/sign-in');
    }catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
    
  };
  return (
    <div className='p-3 max-w-lg mx-auto  '>
      <h1 className='font-semibold  text-center my-7 text-3xl'>Sign Up</h1>
      <form action="" onSubmit={onsubmit} className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' className='border p-3 rounded-lg focus:outline-none' id='username' name="username" onChange={onchange}value={username}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' name="email" onChange={onchange}value={email}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' name="password" onChange={onchange}value={password}/>
        <button disabled={loading} className='bg-slate-900 rounded-lg uppercase p-3 text-white hover:bg-slate-700 opacity-100 disabled:opacity-80' >
          {loading?'Loading..':'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex flex-row gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={"/sign-in"}>
      <span className='text-blue-500'>Sign In</span></Link>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
      </div>
    </div>
  )
}
