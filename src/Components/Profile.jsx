// import React, { use } from 'react'
import { use, useEffect, useState } from 'react'
import Card from './Card'
import Alert from './Alert'
// import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../reducers/userReducer'
import { BASE_URL } from '../Utils/constants'

export const Profile = () => {
    const userProfile = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(userProfile?.firstName || '');
    const [lastName, setLastName] = useState(userProfile?.lastName || '');
    const [email, setEmail] = useState(userProfile?.email || '');
    const [profileUrl, setProfileUrl] = useState(userProfile?.profileUrl || '');
    const [age, setAge] = useState(userProfile?.age || '');
    const [gender, setGender] = useState(userProfile?.gender || '');
    const [skills, setSkills] = useState(userProfile?.skills || '');
    const [about, setAbout] = useState(userProfile?.about || '');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('info');

    useEffect(() => {
        if (!userProfile) {
            navigate('/Login')
        }
        // setShowAlert(false);
    }, [userProfile, navigate])

    const handleProfileUpdate = () => {
        try {
            //update the store 
            const updatedProfile = { firstName, lastName, profileUrl, age, gender, skills, about }
            dispatch(addUser(updatedProfile))
            setShowAlert(false);
            // update the backedn db 
            axios.patch(BASE_URL + "/profile/edit", updatedProfile, { withCredentials: true }).then((res) => {
                setAlertMessage(res.data?.message || "Profile updated successfully");
                setAlertType("success");
                setShowAlert(true);
            }).catch((err) => {
                setAlertMessage(err.response?.data || "An error occurred");
                setAlertType("error");
                setShowAlert(true);
            });
        } catch (error) {
            console.log(error.message);
            <Alert message={error.message} type="error" />
        }
    }
    return (<>

        {showAlert && <Alert message={alertMessage} type={alertType} />}

        <div className="container w-full h-auto flex justify-center items-center">
            <div className='flex justify-center items-center gap-10 w-2/3 h-auto'>
                <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-2/3 border p-4">
                    <legend className="fieldset-legend font-bold text-xl">Profile</legend>
                    <label className="label">First Name</label>
                    <input type="text" className="input w-full" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label className="label">Last Name</label>
                    <input type="text" className="input w-full" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label className="label">Email</label>
                    <input type="email" className="input w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="label">ProfileUrl</label>
                    <input type="text" className="input w-full" placeholder="ProfileUrl" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
                    <label className="label">Age</label>
                    <input type="number" className="input w-full" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <label className="label">Gender</label>
                    <input type="text" className="input w-full" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    <label className="label">Skills</label>
                    <input type="text" className="input w-full" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    <label className="label">About</label>
                    <input type="textarea" className="textarea w-full" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} />
                    <button className="btn btn-neutral mt-4" onClick={handleProfileUpdate}>Update</button>
                </fieldset>
                <Card firstName={firstName} lastName={lastName} age={age} gender={gender} profileUrl={profileUrl} skills={skills} about={about} />
            </div>
        </div>
    </>)
}
