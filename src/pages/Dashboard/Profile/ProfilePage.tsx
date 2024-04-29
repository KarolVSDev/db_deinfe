import { Box } from "@mui/material"
import UpdateUserForm from "../../../components/Forms/UpdateUserForm"


const ProfilePage = () => {
  return (
    
    <Box sx={{width:'30%', m:'auto'}}>
        <UpdateUserForm closeModal={function (): void {
            throw new Error("Function not implemented.")
        } } userId={""}/>
    </Box>
  )
}

export default ProfilePage