import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import  {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getcertificates ,getcertificatesadmin} from "../redux/slices/authslice";
const Mycertificates=()=>{
  const dispatch=useDispatch();
  const {allmycertificates,loading,stateerror,user}=useSelector((state) => state.auth);
  
  useEffect(() => {
    console.log("before dispatch",user._id);
    if (user) {
      // Dispatch the action with the user's id
      if(user.role==="Admin"){
        console.log("here")
        dispatch(getcertificatesadmin());
      }
      else{

        dispatch(getcertificates({ studentId: user._id }));
      }
    }
  }, [dispatch,user]);
  if (loading) {
    // Handle loading state (optional)
    return <p>Loading...</p>;
  }

  if (stateerror) {
    // Handle error state (optional)
    return <p>Error: {stateerror}</p>;
  }

    return(
        <div className='flex justify-center mt-12 text-white text-xl h-screen gap-4 w-[90%] mx-auto'>
            <table className="w-full mx-auto flex flex-col gap-12">
            <thead >
              <tr className="flex justify-between gap-12 w-full mx-auto text-2xl text-amber-200">
                <th>Certificate_Name</th>
                <th>yearofCourse</th>
                <th>AcademicYear</th>
                <th>Category</th>
                <th>Googledrivelink</th>
                
              </tr>
            </thead>
            <tbody className="flex flex-col">
               {/* Map over the certificates from the state */}
          {allmycertificates && allmycertificates.map((certificate) => (
            <tr key={certificate._id} className="flex justify-between w-full mx-auto text-xl border px-2 py-2 items-center">
              <td>{certificate.certname}</td>
              <td>{certificate.yearOfCourses}</td>
              <td>{certificate.AcademicYear}</td>
              <td>{certificate.Category}</td>
              <td>
              <a href={certificate.googleDriveLink} target="_blank" rel="noopener noreferrer">
  <AiOutlineLink />
</a>

              </td>
            </tr>
          ))}
            </tbody>
            </table>
        </div>
    )
}
export default Mycertificates;