import axios from 'axios'
import { API_URL } from '../api/API_URL'

const cloudinaryUpload = (fileToUpload) => {
    return axios.post(API_URL + '/upload/cloudinary', fileToUpload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}

export default cloudinaryUpload