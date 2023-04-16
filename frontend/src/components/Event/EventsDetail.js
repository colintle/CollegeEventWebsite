import {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RatingForm from '../RSO/RatingForm';
import useAuth from '../../helper/useAuth';
import { useDispatch } from 'react-redux';
import { removerating } from '../../actions/rating';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div style={{fontSize: "35px", color: "red"}}>{text}</div>;

// This will contain the ratings
function EventsDetail() {
  const token = JSON.parse(localStorage.getItem('token'));
  const {userID, userType, universityID} = useAuth();
  const publicEvents = useSelector((state) => state.event.public);
  const privateEvents = useSelector((state) => state.event.private);
  const ratings = useSelector((state) => state.rating.rating);
  const {id} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currEvent = null;

  const [isEdit, setIsEdit] = useState(false);
  const [postID, setPostID] = useState(null);

  const handleEdit = (e) => {
    setIsEdit(true);
    setPostID(e.target.value);
  }

  const handleDelete = (e) => {
    const postID = e.target.value;
    dispatch(removerating(postID, navigate));
    navigate("/home")
}

  if (!token)
  {
    return <p>Please login first</p>
  }
  else{
    const existPublic = publicEvents.filter(element => element.ID == id)
    const existPrivate = privateEvents.filter(element => element.ID == id)

    if (existPrivate.length > 0){
      currEvent = existPrivate[0]
    }
    else if (existPublic.length > 0)
    {
      currEvent = existPublic[0]
    }

    if (currEvent == null){
      return (
        <p>Please go to Home Page</p>
      )
    }
    else{
      const propertyList = 
      <div>
        {Object.keys(currEvent).map((key) => {
          if (key == 'Name')
          {
            return <h3 key={key}>{key}: {currEvent[key]}</h3>
          }
          else if (key != 'ID' && key != 'Latitude' && key != 'Longitude')
          {
            return <p key={key}><strong>{key}</strong>: {currEvent[key]}</p>
          }
        })}
        {currEvent.Latitude && currEvent.Longitude && (
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{key: "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"}}
            defaultCenter={{lat: Number(currEvent.Latitude), lng: Number(currEvent.Longitude)}}
            defaultZoom={11}
            >
              <AnyReactComponent
              lat={Number(currEvent.Latitude)}
              lng={Number(currEvent.Longitude)}
              text="x"
              />
            </GoogleMapReact>
          </div>
        )}
      </div>
      
      const ratingList = ratings.map(element => (
        <div key={element.ID}>
          {
            Object.keys(element).map((key) => {
              if (key != "ID" && key != "UserID")
              {
                return (
                  <p key={key}><strong>{key}</strong>: {element[key]}</p>
                )
              }
              })
          }
          {element.UserID == userID && <button onClick={handleEdit} value={element.ID}>Edit</button>}
          {element.UserID == userID && <button onClick={handleDelete} value={element.ID}>Delete</button>}
        </div>
      ))
      return (
        <div>
          <section>
            <h2>Event Details</h2>
          </section>
          <section>
            {propertyList}
          </section>
          <section>
            <h2>Ratings</h2>
            {ratingList}
          </section>
          <section>
            <RatingForm eventID={id} userID={userID} postID={postID} isEdit={isEdit}/>
          </section>
        </div>
      )
    }
  }
}

export default EventsDetail