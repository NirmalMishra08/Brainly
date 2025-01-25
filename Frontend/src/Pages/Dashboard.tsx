import { Button } from "../components/ui/Button";
import Plusicons from "../icons/Plusicons";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import { CreateContentModal } from "../components/CreateContent";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import TwitterIcon from "../icons/TwitterIcon";
import TagIcon from "../icons/TagIcon";
import LinkIcon from "../icons/LinkIcon";
import TextIcon from "../icons/TextIcon";
import VideoIcon from "../icons/VideoIcon";
import useContent from "../Hooks/useContent";
import axios from "axios";


export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const {contents} = useContent();
    console.log(contents)
    console.log("Hello baat"+JSON.stringify(contents));


    const onDelete=async(id:any) =>{
        try {
            console.log(id)
            if (!id) {
                console.error("Content ID is missing");
                return;
            }


          const res = await axios.delete(`http://localhost:4000/api/v1/content/${id}`,{
            headers: {
              Authorization: localStorage.getItem("token"),
            },
           
          })

          console.log(res.data)
          if(res.data.message="Deleted"){
            window.location.reload();
          }
        console.log("Hello world"+ id)
        } catch (error) {
            console.log(((error) as Error).message)
        }
    }

    const LogoutHandler =async () =>{
        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/logout",
                {}, // Empty request body
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
              if(res.data.success){
                window.localStorage.removeItem('token')
                  const user = localStorage.getItem("Users");
                console.log(user)
                window.localStorage.removeItem('Users')
              
                
                window.location.href = '/'
              }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen">

            {/* Sidebar Section */}
            <div className="w-1/5 bg-gray-100 flex flex-col items-center">
                <div className="flex justify-center items-center ">
                    <img width={80} src="Brain.png" alt="" />
                    <div className="text-3xl">Brainly</div>
                </div>
                <Sidebar text="Tweets" icon={<TwitterIcon />} />
                <Sidebar text="Videos" icon={<VideoIcon />} />
                <Sidebar text="Documents" icon={<TextIcon />} />
                <Sidebar text="Links" icon={<LinkIcon />} />
                <Sidebar text="Tags" icon={<TagIcon />} />
            </div>
            <div className="h-screen bg-gray-400 w-[1px]"></div>

            {/* Main Content Section */}
            <div className="w-4/5 flex flex-col gap-6 p-4 overflow-hidden bg-[#F8FBFC]">
                {/* Modal */}
                <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold">All Notes</h1>
                    <div className="flex gap-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => alert("Share Button clicked")}
                            text="Share Icon"
                            startIcon={<ShareIcon />}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setModalOpen(true)}
                            text="Add Content"
                            startIcon={<Plusicons />}
                        />
                         <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>LogoutHandler()}
                            text="Logout"
                            startIcon={<Plusicons />}
                        />
                    </div>
                    
                </div>

                {/* Cards Section with Vertical Scrolling */}
                <div className="flex flex-wrap gap-4 overflow-y-auto h-full pr-4">
                    {Array.isArray(contents) && contents.map(({_id,type,link,title})=> <Card key={_id} onDelete={()=>onDelete(_id)} type={type} link={link} title={title} />)}
                   
                   
                </div>
            </div>
        </div>
    );
}