import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createrating, editrating, removerating} from '../../actions/rating'
import {useNavigate} from 'react-router-dom';

function RatingForm({eventID, userID, postID, isEdit}) {
    const [formData, setFormData] = useState({rating: 0, comment: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let deleteContent;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleDelete = (e) => {
        const postID = e.target.value;
        dispatch(removerating(postID, navigate));
        navigate("/home")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
          dispatch(editrating({ eventID, userID, postID, ...formData }, navigate));
          navigate("/home")
        } else {
          dispatch(createrating({ eventID, userID, ...formData }, navigate));
          navigate("/home")
        }
    };

    return (
        <div>
            {isEdit ? <h2>Edit a Rating</h2> : <h2>Create a Rating</h2>}
            <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <input
                type="number"
                min="0"
                max="5"
                step="1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                Comment:
                <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <button type="submit">{isEdit ? 'Save' : 'Create'}</button>
            </form>
            {deleteContent}
        </div>
      );
}

export default RatingForm