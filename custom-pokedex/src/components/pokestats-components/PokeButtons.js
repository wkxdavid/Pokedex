import React from 'react';
import { Link } from 'react-router-dom';


export function PokeButtons(props) {

    return (
        <div className="back-and-forward">
               <div className="neighbor-left">
                  <Link to={`../about/${props.left.name}`} className="shift-button">
                     <img src={"../../img/left-arrow.png"} alt="left arrow"/>
                     <div className="name">
                        <h2 className="left-neighbor-name">{props.left.name.toUpperCase()}</h2>
                        <h2 className="number-neighbor"> #{props.left.number}</h2>
                     </div>
                  </Link>
               </div>
               <div className="neighbor-right">
                  <Link to={`../about/${props.right.name}`} className="shift-button">
                     <img src={"../../img/right-arrow.png"} alt="right arrow"/>
                     <div className="name">
                        <h2 className="right-neighbor-name">{props.right.name.toUpperCase()}</h2>
                        <h2 className="number-neighbor"> #{props.right.number}</h2>
                     </div>
                  </Link>
               </div>
            </div>
    );
}