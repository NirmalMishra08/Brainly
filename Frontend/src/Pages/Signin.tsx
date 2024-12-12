
const Signin = () => {
  return (
    <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48">
          <Input placeholder="Username" />
          
        </div>
    </div>
  )
}

export default Signin


function Input({ onChange, placeholder }: { onChange: () => void , placeholder: string}) {
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