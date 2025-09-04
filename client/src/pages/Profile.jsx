import { Form } from "react-router-dom"
import {FormInputElement, SubmitBtn} from "../components"

const Profile = () => {
  return (
    <div className="outlet">
      <Form>
        <h4>Profile</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <FormInputElement name='name' label='first name' value='Tommy' />
            <FormInputElement name='lastname' label='Last name' value='marshal' />
            <FormInputElement name='email' value='tommy@email.com' />
          </div>
            <SubmitBtn />
        
      </Form>
    </div>
  )
}

export default Profile