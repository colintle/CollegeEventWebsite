import {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { leaverso, studentsinrso } from '../../actions/rso';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../helper/useAuth';
import CreateEvent from '../Event/CreateEvent';

function PostAdmin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userID, universityID} = useAuth()
    const [rsoID, setRsoID] = useState(null)

    const seeRSOEvents = (e) => {
        const rsoID = e.target.value
        const url = `/rsos/${rsoID}`
        dispatch(studentsinrso(rsoID))
        navigate(url)
    }

    const handleLeave = (e) => {
        const rsoID = e.target.value;
        const formData = {userID, rsoID};
    
        dispatch(leaverso(formData, navigate))
        navigate("/home")
    }

    const handleCreate = (e) => {
        const rsoID = e.target.value;
        setRsoID(rsoID)
    }

    const joinedRso = useSelector((state) => state.rso.joined);

    if (joinedRso)
    {
        return (
            <div>
                <section>
                    <h2>Admin Page</h2>
                </section>

                <section>
                    <h2>Joined RSOs</h2>
                    {joinedRso && joinedRso.map(element => (
                    <div key={element.ID}>
                        <h4>{element.Name}</h4>
                        <button onClick={seeRSOEvents} value={element.ID}>See Events!</button>
                        <button onClick={handleLeave} value={element.ID}>Leave RSO</button>
                        <button onClick={handleCreate} value={element.ID}>Create Event</button>
                    </div>
                    ))}
                </section>

                <section>
                    {rsoID != null && <CreateEvent rsoID={rsoID} universityID={universityID}/>}
                </section>
            </div>
        )
    }
    else
    {
        return <p>Please reload this page</p>
    }
}

export default PostAdmin