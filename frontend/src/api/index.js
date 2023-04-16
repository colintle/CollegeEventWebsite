import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:9000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token'))
    {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`;
    }
    return req;
});

// formData is an object
export const createUser = (formData) => API.post("/user/create", formData)
export const loginUser = (formData) => API.post("/user/login", formData)
export const editUser = (formData) => API.post("/user/edit", formData)
export const removeUser = () => API.post("/user/delete")

export const getUni = () => API.get("/uni/get")
export const editUni = (formData) => API.post("/uni/edit", formData)
export const createUni = (formData) => API.post("/uni/create", formData)
export const deleteUni = (id) => API.delete("/uni/remove", {id})

export const getRating = (eventID) => API.post("/ratings/get", {eventID})
export const editRating = (formData) => API.post("/ratings/edit", formData)
export const createRating = (formData) => API.post("/ratings/create", formData)
export const removeRating = (postID) => API.post("/ratings/remove", {postID})

export const createEvent = (formData) => API.post("/event/create", formData)
export const publicEvent = (universityID) => API.post("/event/public", {universityID})
export const privateEvent = (universityID) => API.post("/event/private", {universityID})
export const rsoEvent = (formData) => API.post("/event/rso", formData)
export const approveEvent = (eventID) => API.post("/event/approve", {eventID})
export const disapproveEvent = (eventID) => API.post("/event/deny", {eventID})
export const editEvent = (formData) => API.post("/event/edit", formData)
export const removeEvent = (eventID) => API.post("/event/remove", {eventID})

export const joinRso = (formData) => API.post("/rso/join", formData)
export const leaveRso = (formData) => API.post("/rso/leave", formData)
export const createRso = (formData) => API.post("/rso/create", formData)
export const approvedRso = (universityID) => API.post("/rso/approved", {universityID})
export const unapprovedRso = (universityID) => API.post("/rso/unapproved", {universityID})
export const associatedRso = (userID) => API.post("/rso/getRSO", {userID})
export const editRso = (formData) => API.post("/rso/edit", formData)
export const removeRso = (rsoID) => API.post("/rso/remove", {rsoID})
export const studentsInRso = (rsoID) => API.post("/rso/student", {rsoID})