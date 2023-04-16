import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../helper/useAuth';
import {useNavigate} from 'react-router-dom';
import { joinrso, leaverso, studentsinrso } from '../../actions/rso';
import { getrating } from '../../actions/rating';
import CreateRSO from "../RSO/CreateRSO";

function PostHome() {
  const publicEvents = useSelector((state) => state.event.public)
  const privateEvents = useSelector((state) => state.event.private)

  const joinedRso = useSelector((state) => state.rso.joined)
  const approvedRso = useSelector((state) => state.rso.approved)
  const unapprovedRso = useSelector((state) => state.rso.unapproved)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userID, universityID} = useAuth()

  const handleJoin = (e) => {
    const rsoID = e.target.value;
    const formData = {userID, rsoID};
    const existOrNot = joinedRso.filter(element => element.ID == rsoID);

    if (existOrNot.length > 0)
    {
      alert("You are already in the RSO!")
    }
    else
    {
      dispatch(joinrso(formData, navigate));
      navigate("/home")
    }
  }

  const handleLeave = (e) => {
    const rsoID = e.target.value;
    const formData = {userID, rsoID};

    dispatch(leaverso(formData, navigate))
    navigate("/home")
  }

  const seeDetails = (e) => {
    const eventID = e.target.value;
    const url = `/events/${eventID}`;
    dispatch(getrating(eventID));
    navigate(url)
  }

  const seeRSOEvents = (e) => {
    const rsoID = e.target.value
    const url = `/rsos/${rsoID}`
    dispatch(studentsinrso(rsoID))
    navigate(url)
  }

  if (publicEvents && privateEvents && joinedRso && approvedRso)
  {
    return (
      <div>
        <section>
          <h2>Home Page</h2>
        </section>

        <section>
          <h4>Public Events</h4>
          {publicEvents && publicEvents.map(element => (
            <div key={element.ID}>
              <h6>{element.Name}</h6>
              <p>{element.Description}</p>
              <button onClick={seeDetails} value={element.ID}>See More Details</button>
            </div>
          ))}
        </section>

        <section>
          <h4>Private Events</h4>
          {privateEvents && privateEvents.map(element => (
            <div key={element.ID}>
              <h6>{element.Name}</h6>
              <p>{element.Description}</p>
              <button onClick={seeDetails} value={element.ID}>See More Details!</button>
            </div>
          ))}
        </section>

        <section>
          <h4>Joined RSOs</h4>
          {joinedRso && joinedRso.map(element => (
            <div key={element.ID}>
              <h6>{element.Name}</h6>
              <button onClick={seeRSOEvents} value={element.ID}>See Events!</button>
              <button onClick={handleLeave} value={element.ID}>Leave RSO</button>
            </div>
          ))}
        </section>

        <section>
          <h4>Approved RSOs</h4>
          {approvedRso && approvedRso.map(element => (
            <div key={element.ID}>
              <h6>{element.Name}</h6>
              <button onClick={handleJoin} value={element.ID}>Join now!</button>
            </div>
          ))}
        </section>

        <section>
          <h4>Unapproved RSOs</h4>
          {unapprovedRso && unapprovedRso.map(element => (
            <div key={element.ID}>
              <h6>{element.Name}</h6>
              <button onClick={handleJoin} value={element.ID}>Need more members to become official!</button>
            </div>
          ))}
        </section>
        
        <section>
          <CreateRSO/>
        </section>
      </div>
    )
  }
  else
  {
    <div>Loading</div>
  }
}

export default PostHome