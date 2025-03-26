import { Box } from "@mui/material"
import UpdateUserForm from "../../../components/Forms/FormsUser/UpdateUserForm"
import { useAuth } from "../../../context/AuthContext"
import { Navigate } from "react-router-dom"


const ProfilePage = () => {

  return (

    <Box sx={{ width: '30%', m: 'auto' }}>
      <UpdateUserForm closeModal={function (): void {
        throw new Error("Function not implemented.")
      }} />
    </Box>
  )
}

export default ProfilePage