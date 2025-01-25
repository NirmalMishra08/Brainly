import DeleteIcon from "../icons/DeleteIcon"
import ShareIcon from "../icons/ShareIcon"
import TextIcon from "../icons/TextIcon"
import { Button } from "./ui/Button"

interface CardProps {
  title: string,
  link: string,
  type: "twitter" | "youtube",
  onDelete:()=>void,
  onClick:()=>void

}
const Card = ({ title, link, type ,onDelete ,onClick }:CardProps) => {
  return (
    <div className="font-medium mx-3">
      <div className="p-4 bg-white rounded-lg border-gray-300 shadow-md max-w-72 border-[1px] flex flex-col gap-4 min-h-48 ">
        <div className="Nav flex flex-row gap-3 justify-between text-2xl">
          <div className="Name flex flex-row gap-1 items-center text-center">
            <div>
              <TextIcon />
            </div>
            <h1>{title}</h1>
          </div>
          <div className="icons flex flex-row gap-3 items-center">
            <div className="text-gray-500 ">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>

            </div>
<div onClick={()=>onDelete()}>
<DeleteIcon />
</div>
         
          </div>

        </div>
        <div className="Content  font-light h-1/2 ">

          {type === 'youtube' && <iframe className="w-full" src={link.replace('watch', "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {type === 'twitter' &&
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          }

        </div>
        <div className='tag text-sm '>
          <div className="h">
            <Button variant="secondary" size="sm" onClick={() => alert("Button clicked")} text="Click Me" startIcon={<ShareIcon />} />
            <div>
              Date Added :
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Card
