
import { Component } from "react"

import Navbar1 from "../Navbar/navbar.js"
import Cooking from "./video/cookingvideo4.mp4"
import NavigateButton from "../Explorenowbtn"
import "./home.css"



class  Home  extends Component {
    render(){
        return (<div className="video">
        <video src={Cooking} autoPlay loop muted className="video_css"  plays-inline="true"> </video>
        <Navbar1 />

        <div className="content">
              <h1>Cook Your Own Food!</h1>
              <NavigateButton />
        </div>
        </div>)
}
    }
    
export default Home