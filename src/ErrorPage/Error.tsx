import React from "react";
import {useNavigate} from "react-router-dom";
import Button from '../components/UI/Button/Button';

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/", {replace: true})
  }
  return (
    <>
      <div className="error-content">
        <p>Page is not found
        <Button onClick={handleClick}>Come back to welcome page</Button>
        </p>
      </div>
    </>
  )
}
export default Error;