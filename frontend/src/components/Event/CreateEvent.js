import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createevent} from "../../actions/event";
import MapPicker from "react-google-map-picker";
import { useNavigate } from 'react-router-dom';

function CreateEvent({rsoID, universityID}) {
  const publicEvents = useSelector((state) => state.event.public)
  const privateEvents = useSelector((state) => state.event.private)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Name: "",
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
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let sameLocationPublic = publicEvents.filter((element) => (element.Latitude == formData.latitude && element.Longitude == formData.longitude && element.Time == formData.time && element.Date == formData.date))

    let sameLocationPrivate = privateEvents.filter((element) => (element.Latitude == formData.latitude && element.Longitude == formData.longitude && element.Time == formData.time && element.Date == formData.date))

    if (sameLocationPrivate.length > 0)
    {
      alert(`Conflict Private Event of Time with ${sameLocationPrivate[0].Name}`)
      return;
    }

    if (sameLocationPublic.length > 0)
    {
      alert(`Conflict Public Event of Time with ${sameLocationPublic[0].Name}`)
      return;
    }
    
    if (formData.latitude != "" && formData.longitude != "")
    {
      dispatch(createevent(formData, navigate));
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

  const DefaultZoom = 10;

  return (
    <div>
      <h2>Create an Event</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
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
      </form>
    </div>
  )
}

export default CreateEvent