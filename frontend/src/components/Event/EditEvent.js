import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {editevent, removeevent} from "../../actions/event";
import MapPicker from "react-google-map-picker";
import { useNavigate } from 'react-router-dom';

function CreateEvent({rsoID, universityID, eventID}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    time: "",
    date: "",
    locationName: "",
    latitude: 10,
    longitude: 106,
    contactPhone: "",
    contactEmail: "",
    isPublic: false,
    universityID: universityID,
    rsoID: rsoID,
    eventID: eventID
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formData.latitude != "" && formData.longitude != "")
    {
      dispatch(editevent(formData, navigate));
      navigate("/home")
    }
    else
    {
      alert("Location is needed!")
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (lat, lng) => {
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
    });
  };

  const handleDeleteEvent = (e) => {
    if (eventID != null)
    {
        dispatch(removeevent(eventID, navigate))
    }
    navigate("/")
  }

  const DefaultZoom = 10;

  return (
    <div>
      <h2>Edit an Event</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleInputChange}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="social">Social</option>
          <option value="fundraising">Fundraising</option>
          <option value="tech_talks">Tech Talks</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="time">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="locationName">Location Name</label>
        <input
          type="text"
          name="locationName"
          value={formData.locationName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="contactPhone">Contact Phone</label>
        <input
          type="text"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="isPublic">Is Public</label>
        <select
          name="isPublic"
          value={formData.isPublic}
          onChange={handleInputChange}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <MapPicker
        defaultLocation={{lat:formData.latitude, lng: formData.longitude}}
        zoom={DefaultZoom}
        mapTypeId='roadmap'
        style={{height: '700px'}}
        onChangeLocation={handleLocationChange}
        apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
        />

        <button type="submit">Submit</button>
        <button onClick={handleDeleteEvent}>Delete Event</button>
      </form>
    </div>
  )
}

export default CreateEvent