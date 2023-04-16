import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token){
        return {
            userID: null,
            username: null,
            userType: null,
            universityID: null,
            exp: null
        }
    }
    const decoded = jwtDecode(token);

    const {userID, username, userType, universityID, exp} = decoded;

    return {
        userID,
        username,
        userType,
        universityID,
        exp
    }
}

export default useAuth