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


export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);

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
                    </div>
                </div>

                {/* Cards Section with Vertical Scrolling */}
                <div className="flex flex-wrap gap-4 overflow-y-auto h-full pr-4">
                    <Card type="twitter" link="https://x.com/91_79Wankhede_/status/1866781851282706547" title="First Tweet" />
                    <Card type="youtube" link="https://www.youtube.com/watch?v=YJdmAhKuHAw" title="First Video" />
                    <Card type="youtube" link="https://www.youtube.com/watch?v=YJdmAhKuHAw" title="Second Video" />
                    <Card type="youtube" link="https://www.youtube.com/watch?v=YJdmAhKuHAw" title="Third Video" />
                    <Card type="youtube" link="https://www.youtube.com/watch?v=YJdmAhKuHAw" title="Fourth Video" />
                    <Card type="youtube" link="https://www.youtube.com/watch?v=YJdmAhKuHAw" title="Fifth Video" />
                </div>
            </div>
        </div>
    );
}