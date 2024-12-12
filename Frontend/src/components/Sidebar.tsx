export function Sidebar({text,icon}:{
    text:string,
    icon: JSX.Element
}){
    return(
        <div className="flex flex-row gap-4 px-10 py-5 font-light text-xl hover:bg-gray-300 rounded-full m-2">
            <div className="flex items-center justify-center">
                {icon}
            </div>
            <div className="text-center text-xl font-semibold">{text}</div>
        </div>
    )

}