import { Button } from "../components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signin = () => {
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
    console.log(value)

  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // send to server
    console.log(formData)
    // reset form
   
    try {
      const res = await axios.post("http://localhost:4000/api/v1/signin", formData)
      console.log(res.data)
      if (res.data.success) {
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('user', JSON.stringify(res.data))
        alert(`welcome ${res.data.email}`)
        navigate('/dashboard')
      }

    } catch (error) {
      console.log(((error) as Error).message)

    }
    setFormData({

      email: "",
      password: "",
    });

  }
  return (
    <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border min-w-48 p-10 flex flex-col items-center gap-3 ">

        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <Input name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <div className="flex justify-center w-56">
          <Button variant="primary" text="Signup" FullWidth={true} />
        </div>
        <div className="">
          Do not have account click here <span className="underline hover:text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>Click Me!</span>
        </div>
      </form>
    </div>
  )
}

export default Signin


function Input({ onChange, name, type, value, placeholder }: {
  onChange?: () => void,
  placeholder: string,
  name: string,
  type?: string,
  value: string
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        className="px-4 py-2 border"
        onChange={onChange}
        name={name}
        id={name}
        value={value}
      />
    </div>
  );
}