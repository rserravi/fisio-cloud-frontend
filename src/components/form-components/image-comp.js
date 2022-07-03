import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Webcam from "react-webcam";
import { styled } from '@mui/material/styles';


//ICONS
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { nc_image_Commit } from '../../slices/newCustomer-slice';


export const ImageComponent = (props) =>{
  const dispatch = useDispatch();

  const newUserSelector =  useSelector(state => state.newCustomer);
  const imageInit= "/images/Portrait_Placeholder.png";
  const [image, setImage] = React.useState(imageInit);
    
  React.useEffect (()=>{
      //console.log(props)
      if (props.editUser){
          const image2 = newUserSelector.image
          console.log(image2)
          setImage(image2)
      }
    
    },[props, newUserSelector.image])
    
    const [webcamShow, setWebcamShow] = React.useState(false); 
    
    const videoConstraints = {
        width: 160,
        height: 160,
        facingMode: "user"
    };
     
    const webcamRef = React.useRef(null);
    
    function handleFileChange(e) {
        setImage(URL.createObjectURL(e.target.files[0])); 
        dispatch(nc_image_Commit(URL.createObjectURL(e.target.files[0])))
        }

    const getWebcamShot = ()=>{
        if (!webcamShow){
            setWebcamShow(true);
    }
        else {
            const image = capture();
            setImage(image);
            setWebcamShow(false);
        }
    }
     
    const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          dispatch(nc_image_Commit(imageSrc));
          return imageSrc
        },
        [webcamRef, dispatch]
    );
    
    const deletePicture = () =>{
       setImage(imageInit)
    }

    const Input = styled('input')({
        display: 'none',
      });

    return(
        <React.Fragment>
            <Paper>
                <ButtonBase height="160" width="160">
                    
                    {webcamShow ? <Webcam
                        audio={false}
                        height={160}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={160}
                        videoConstraints={videoConstraints}
                    /> :
                    <img width={155} height={155} src={image} alt="Upload"></img>
                    }
                </ButtonBase>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="upload-button">
                    <Input accept="image/*" id="upload-button" type="file" onChange={handleFileChange}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <UploadIcon />
                    </IconButton>
                  </label>
                  <label htmlFor="camera-button">
                    <IconButton color={!webcamShow?"primary":"success"} aria-label="make picture" component="span" onClick={getWebcamShot}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <IconButton color="primary" aria-label="make picture" component="span" onClick={deletePicture}>
                      <DeleteIcon />
                  </IconButton>
                 </Stack>
            </Paper>
     </React.Fragment>
    )
  }
