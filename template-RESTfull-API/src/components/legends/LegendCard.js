import React from 'react'
import { Link } from 'react-router-dom' 



const LegendCard = ({ fullName, image, _id }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/legends/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{fullName}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            <img src={image} alt={fullName}/>
          </figure>
        </div>
      </div>
    </Link>
  </div>
)

export default LegendCard