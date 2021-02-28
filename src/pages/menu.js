import React from "react";
import {Link} from "react-router-dom";


function Menu(){
 return(
     <div className="menuSelect">
         <ul style={color:"white"}>
             <li>Load Game</li>
             <li>New Game</li>
         </ul>
     </div>
 )
}

export default Menu