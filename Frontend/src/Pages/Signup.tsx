import { Button } from "../components/ui/Button";

const Signup = () => {
    return (
        <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center ">
            <div className="bg-white rounded-xl border min-w-48 p-10 flex flex-col gap-3 ">
                <Input placeholder="Username" />
                <Input placeholder="Email" />
                <Input placeholder="Password" />
                <div className="flex justify-center">
                    <Button variant="primary" text="Signup" FullWidth={true} />
                </div>




            </div>
        </div>
    )
}

export default Signup


function Input({ onChange, placeholder }: { onChange?: () => void, placeholder: string }) {
    return (
        <div>
            <input
                placeholder={placeholder}
                type="text"
                className="px-4 py-2 border"
                onChange={onChange}
            />
        </div>
    );
}