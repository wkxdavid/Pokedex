import React from 'react';

export function PokePhysical(props) {

    return (
        <div className="stats-img-content">
            <article>
               <div className="physicals">
                  <div className="physical-stat">
                     <h3>Height</h3>
                     <h3 className="data">{props.height}</h3>
                  </div>
                  <div className="physical-stat">
                     <h3>Category</h3>
                     <h3 className="data">{props.category}</h3>
                  </div>
                  <div className="physical-stat">
                     <h3>Weight</h3>
                     <h3 className="data-small">{props.weight}</h3>
                  </div>
                  <div className="physical-stat">
                     <h3>Abilities</h3>
                     <div>
                        <h3 className="data-small">{props.abilities}</h3>
                     </div>
                  </div>
                  <div className="physical-stat">
                     <h3>Gender</h3>
                     <h3 className="data">{props.gender}</h3>
                  </div>
               </div>
            </article>
        </div>
    );
}