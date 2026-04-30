// export const Test = () => {
 
//  const dispatch = useDispatch();
//     const fetchUserProfile = async () => {
//         const res = await axios.get("/profile", { withCredentials: true })

//         console.log(res.data);
//     }
//     useEffect(() => {
//         fetchUserProfile();
//     }, [userProfile])

//     const handleInputChange = (label, value) => {
//         // console.log(field, value);
//         // Update the userProfile in the Redux store based on the field and value
//     }
//     const handleSubmit = () => {
//         console.log("submit profile");


//     }

//     return (
//         <div className="flex items-center justify-center gap-10 mt-10 w-2/3 mx-auto">
//             <Form formType="Edit Profile" submitText="Save Changes" formFields={[
//                 { label: "First Name", type: "text", placeholder: "Your First Name", value: userProfile.firstName },
//                 { label: "Last Name", type: "text", placeholder: "Your Last Name", value: userProfile.lastName },
//                 { label: "Email", type: "email", placeholder: "Your Email", value: userProfile.email },
//                 { label: "Gender", type: "text", placeholder: "Your Gender", value: userProfile.gender },
//                 { label: "Age", type: "text", placeholder: "Your Age", value: userProfile?.age },
//                 { label: "Profile Url", type: "text", placeholder: "Your Profile Url", value: userProfile?.profileUrl },
//                 { label: "Skills", type: "text", placeholder: "Your Skills", value: userProfile?.skills },
//                 { label: "About", type: "textarea", placeholder: "A short bio about you", value: userProfile?.about },
//             ]} handleChange={handleInputChange} handleSubmit={handleSubmit} />
//             <Card firstName={userProfile.firstName} lastName={userProfile.lastName} age={userProfile.age} gender={userProfile.gender} profileUrl={userProfile.profileUrl} skills={userProfile.skills} about={userProfile.about} />
//         </div>
//     )

