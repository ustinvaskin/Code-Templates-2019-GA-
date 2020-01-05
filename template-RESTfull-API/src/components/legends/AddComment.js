import React from 'react'

const AddComment = ({ data, handleChange, handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <textarea className="textarea" value={data} onChange={handleChange} />
    <button type="submit" className="button">Add a Comment </button>
  </form>
)

export default AddComment


// import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// import AuthToken from '../../lib/AuthToken'
// import LegendsIndex from './LegendsIndex'

// class AddComment extends React.Component {
//   constructor() {
//     super()

//     this.state = {
//       comment: ''
//     }

//     this.handleChange = this.handleChange.bind(this)
//   }


//   handleChange(event) {
//     this.setState({ comment: event.target.value })
//     console.log(this.state.comment)
//   }

//   //const AddComment = ({ data, handleChange, handleSubmit, errors }) => (
//   render() {
//     console.log('render comment')
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <textarea className="textarea" value={this.state.value} onChange={this.handleChange} />
//         <button type="submit" className="button">Add a Comment </button>
//       </form>
//     )
//   }
// }

// export default AddComment