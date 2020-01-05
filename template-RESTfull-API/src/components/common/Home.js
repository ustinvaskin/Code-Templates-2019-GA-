import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <section className="hero is-fullheight-with-navbar has-bg-img">
    <div className="hero-body">
      <div className="container is-overlay home">
        <p className="title is-1 has-text-centered">
        👨🏼‍💻Legends of Tech👩🏾‍💻
        </p>
        <Link to={'/legends'} >
          <p className="subtitle is-4 has-text-centered">
          👉🏿Explore👈🏻
          </p>
        </Link>
      </div>
    </div>
  </section>
)

export default Home