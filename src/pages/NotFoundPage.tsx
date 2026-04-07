import Image from "react-bootstrap/Image"
import NotFoundImage from "../assets/images/NotFound.jpg"
export const NotFoundPage = () => {
  return (
    <>
    <Image src={NotFoundImage} alt="404" height="500px" width="500px" text-align="center" justify-content="center"/>
    </>

  ) 
}

export default NotFoundPage;
