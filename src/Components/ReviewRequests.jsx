
import UserList from './UserList'
import axios from 'axios'

const ReviewRequests = () => {


    return (
        <ul className="list bg-base-300 rounded-box shadow-md mt-24 flex flex-col gap-4 max-w-2/3 mx-auto">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your pending Requests</li>

            <li className="list-row w-full">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                <div>
                    <div>Dio Lupa</div>
                    <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                </div>
                <button className="btn btn-sm btn-success">Accept</button>
                <button className="btn btn-sm btn-error">Reject</button>
            </li>


        </ul>
    )
}

export default ReviewRequests