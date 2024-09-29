import { Poppins } from "next/font/google"
import { CardSpotlightDemo } from "./IDCard"

const poppin = Poppins({
    subsets:['latin'],
    weight:["100","200","300","400","500","600","700","800","900"]
})

export default function ID(){
    return(
        <div className={`${poppin.className} p-4`}>
            <h1 className="text-4xl text-center">Get your personalised ID Card</h1>
            <div className="flex items-center mt-4 p-4 justify-center">
                <CardSpotlightDemo/>
            </div>
        </div>
    )
}
