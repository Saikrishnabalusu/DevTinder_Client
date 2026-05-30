
import UserList from './UserList'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setPendingRequests } from '../reducers/requestReducer'

const ReviewRequests = () => {
    const myPendingRequests = useSelector(state => state.requests.pendingRequests) || [];
    const dispatch = useDispatch();
    useEffect(() => {
        const getReviewRequests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/pendingRequests`, { withCredentials: true });
                // console.log("pending requests...", response?.data)
                dispatch(setPendingRequests(response.data?.data));
            } catch (error) {
                console.error("Error fetching review requests:", error);
            }
        };
        getReviewRequests();
    }, []);



    return (
        <ul className="list bg-base-300 rounded-box shadow-md mt-24 flex flex-col gap-4 max-w-2/3 mx-auto">

            {myPendingRequests.length > 0 && <li className="p-4 pb-2 text-xs opacity-60 tracking-wide ">Your Pending Requests</li>}
            {myPendingRequests.length > 0 ? myPendingRequests.map((request) =>
                <UserList key={request._id} id={request._id} profileUrl={request.profileUrl} firstName={request.firstName} lastName={request.lastName} gender={request.gender} age={request.age} skills={request.skills} />) : <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">No pending requests</li>}

        </ul>
    )
}

export default ReviewRequests