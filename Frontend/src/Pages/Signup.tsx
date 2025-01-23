import { Button } from "../components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
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
        setFormData({
            username: "",
            email: "",
            password: "",
        });
        try {
            const res = await axios.post("http://localhost:4000/api/v1/signup", formData)
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center ">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border min-w-48 p-10 flex flex-col gap-3 ">
                <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <Input name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <div className="flex justify-center">
                    <Button variant="primary" text="Signup" FullWidth={true} />
                </div>

            </form>

        </div>
    )
}

export default Signup


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