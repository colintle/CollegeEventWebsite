import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../helper/useAuth';
import EditEvent from "../Event/EditEvent";
import StudentsIn from './StudentsIn';
import { editrso } from '../../actions/rso';

// This will contain the events from the rso
function RSOsDetail() {
    const token = JSON.parse(localStorage.getItem('token'));
    const {id} = useParams()
    const {userType, universityID} = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const publicEvents = useSelector((state) => state.event.public)
    const privateEvents = useSelector((state) => state.event.private)
    const approvedRso = useSelector((state) => state.rso.approved)
    const students = useSelector((state) => state.rso.students)
    const joinedRso = useSelector((state) => state.rso.joined)

    const [canEdit, setCanEdit] = useState(false);
    const [IDEvent, setIDEvent] = useState(null);

    const handleEdit = (e) => {
        setCanEdit(true)
        setIDEvent(e.target.value)
    }

    if (!token)
    {
        return <p>Please login first</p>
    }
    else
    {
        const seeDetails = (e) => {
            const eventID = e.target.value;
            const url = `/events/${eventID}`
            navigate(url)
        }

        const existPublic = publicEvents.filter(element => element.RSOID == id)
        const existPrivate = privateEvents.filter(element => element.RSOID == id)
        const joined = joinedRso.filter(element => element.ID == id)

        const handleApprove = () => {
            if (joined[0]?.IsApprove == true)
            {
                alert("This RSO is already approved!")
            }
            else if (students.length < 5)
            {
                alert("There is not enough members (at least 5)")
            }
            else
            {
                const formData = {
                    rsoID: joined[0].ID,
                    name: joined[0].Name,
                    universityID: joined[0].UniversityID,
                    isApprove: true,
                }
                dispatch(editrso(formData, navigate))
                navigate("/")
            }
        }
    
        const handleDeny = () => {
            if (joined[0]?.IsApprove == false)
            {
                alert("This RSO is already denied!")
            }
            else
            {
                const formData = {
                    rsoID: joined[0].ID,
                    name: joined[0].Name,
                    universityID: joined[0].UniversityID,
                    isApprove: false,
                }
                dispatch(editrso(formData, navigate))
                navigate("/")
            }
        }

        if (joined.length == 0)
        {
            return (
                <p>Please go to Home Page.</p>
            )
        }
        else if ((existPrivate.length == 0 && existPublic.length == 0))
        {
            return (
                <div>
                    <p>There are no events.</p>
                    {
                        userType != "student" && joined && 
                        (
                            <section>
                                <StudentsIn/>
                                <button onClick={handleApprove}>Approve</button>
                                <button onClick={handleDeny}>Deny</button>
                            </section>
                        )
                    }
                </div>
            )
        }
        return (
            <div>
                <section>
                    <h1>{joined[0]?.Name}</h1>
                </section>
                
                <section>
                    <h2>Public Events</h2>
                    {existPublic.map(element => (
                    <div>
                        <h4>{element.Name}</h4>
                        <p>{element.Description}</p>
                        <button onClick={seeDetails} value={element.ID}>See More Details</button>
                        {userType != 'student' && joined && <button onClick={handleEdit} value={element.ID}>Edit Event</button>}
                    </div>
                    ))}
                </section>

                <section>
                    <h2>Private Events</h2>
                    {existPrivate.map(element => (
                    <div>
                        <h4>{element.Name}</h4>
                        <p>{element.Description}</p>
                        <button onClick={seeDetails} value={element.ID}>See More Details!</button>
                        {userType != 'student' && joined && <button onClick={handleEdit} value={element.ID}>Edit Event</button>}
                    </div>
                    ))}
                </section>

                <section>
                    {canEdit && <EditEvent rsoID={id} universityID={universityID} eventID={IDEvent}/>}
                </section>

                {
                    userType != "student" && joined && 
                    (
                        <section>
                            <StudentsIn/>
                            <button onClick={handleApprove}>Approve</button>
                            <button onClick={handleDeny}>Deny</button>
                        </section>
                    )
                }
            </div>
        )
    }
}

export default RSOsDetail