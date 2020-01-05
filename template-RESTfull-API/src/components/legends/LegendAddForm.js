import React from 'react'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import CreatableSelect from 'react-select/creatable'
//import LegendAddFormArray from './LegendAddFormArray'

const LegendAddForm = ({ data, handleChange, handleSubmit, errors, handleMultiSelect, components, options }) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Full Name</label>
      <div className="control">
        <input 
          className={`input ${errors.fullName ? 'is-danger' : ''}`}
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
          value={data.fullName}
        />
      </div>
      {errors.fullName && <small className="help is-danger">{errors.fullName}</small>}
    </div>
    <div className="field">
      <label className="label">Year of Birth</label>
      <div className="control">
        <input 
          className={`input ${errors.yearBorn ? 'is-danger' : ''}`}
          placeholder="Year of Birth"
          name="yearBorn"
          onChange={handleChange}
          value={data.yearBorn}
        />
      </div>
      {errors.yearBorn && <small className="help is-danger">{errors.yearBorn}</small>}
    </div>
    <div className="field">
      <label className="label">Year of Death</label>
      <div className="control">
        <input 
          className={`input ${errors.yearofDeath ? 'is-danger' : ''}`}
          placeholder="Year of Death"
          name="yearofDeath"
          onChange={handleChange}
          value={data.yearofDeath}
        />
      </div>
      {errors.yearofDeath && <small className="help is-danger">{errors.yearofDeath}</small>}
    </div>
    <div className="field">
      <label className="label">Gender</label>
      <div className="select">
        <select name="gender" onChange={handleChange} value={data.gender}>
          <option value="" disabled>Pick your gender</option>
          <option value="female">She/Her</option>
          <option value="male">He/Him</option>
          <option value="they">They/Them</option>
        </select>
      </div>
      {errors.gender && <small className="help is-danger">{errors.gender}</small>}
    </div>
    <div className="field">
      <label className="label">Image</label>
      <div className="control">
        <input 
          className={`input ${errors.image ? 'is-danger' : ''}`}
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={data.image}
        />
      </div>
      {errors.image && <small className="help is-danger">{errors.image}</small>}
    </div>

    <div className="field">
      <label className="label">Famous Projects</label>
      <div className="control">
        <CreatableSelect
          isMulti
          onChange={handleMultiSelect}
          components={components}
          options={options}
          placeholder="Select or type your own"
        />
      </div>
      {errors.famousProject && <small className="help is-danger">{errors.famousProject}</small>}
    </div>

    {/* <div className="field">
      <label className="label">Famous Projects</label>
      <div className="control">
        <textarea 
          className="textarea"
          placeholder="Famous Projects"
          name="famousProject"
          onChange={handleChange}
          value={data.famousProject}
        />
      </div>
      {errors.famousProject && <small className="help is-danger">{errors.famousProject}</small>}
    </div> */}

    <div className="field">
      <label className="label">More information about the awesome things they did</label>
      <div className="control">
        <textarea 
          className="textarea"
          placeholder="More Information"
          name="whyALegend"
          onChange={handleChange}
          value={data.whyALegend}
        />
      </div>
    </div>
    <button type="submit" className="button is-warning is-fullwidth">Add a new Tech Legend</button>
  </form>
)

export default LegendAddForm

{/* <CreatableSelect
      isMulti
      onChange={handleChangeCreatable}
    /> */}

{/* <input 
className={`input ${errors.gender ? 'is-danger' : ''}`}
placeholder="Gender"
name="gender"
onChange={handleChange}
value={data.gender}
/> */}