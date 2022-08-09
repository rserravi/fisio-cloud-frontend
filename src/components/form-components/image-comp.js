import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ButtonBase, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Webcam from "react-webcam";
import { styled } from '@mui/material/styles';
import FileResizer from 'react-image-file-resizer';


//ICONS
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { nc_image_Commit } from '../../slices/newCustomer-slice';
//import { convertToBase64 } from '../../utils/dataFetch-utils';


export const ImageComponent = (props) =>{
  const dispatch = useDispatch();

  const newUserSelector =  useSelector(state => state.newCustomer);
  const imageInit= "/images/Portrait_Placeholder.png";
  const [image, setImage] = React.useState(newUserSelector.image);
  const [firstLoad, setFirstLoad] = React.useState(true)

  const resizeFile = (file) => new Promise(resolve => {
    FileResizer.imageFileResizer(file, 160, 160, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    }, 'base64' );
});

    
  React.useEffect (()=>{
      if (firstLoad){ 
        if (props.image){
          setImage(props.image)
        }
       // console.log(image)
        setFirstLoad(false);
      }
    
    },[props, newUserSelector.image, image, firstLoad])
    
    const [webcamShow, setWebcamShow] = React.useState(false); 
    
    const videoConstraints = {
        width: 160,
        height: 160,
        facingMode: "user"
    };
     
    const webcamRef = React.useRef(null);
    
    const  handleFileChange = async (e) =>{
        const file = e.target.files[0];
        const base64 = await resizeFile(file)
        setImage(base64); 
        dispatch(nc_image_Commit(base64))
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
           
              <Grid container direction="column">
              <Paper>
                <Grid item xs={12} sm={12} md={12} >
                  <ButtonBase height="150" width="150" sx={{m:2}}>
                      
                      {webcamShow ? <Webcam
                          audio={false}
                          height={160}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={160}
                          videoConstraints={videoConstraints}
                      /> :
                      <img width={145} height={165} src={image} alt="Upload"></img>
                      }
                  </ButtonBase>
                </Grid>
               
                <Grid container direction="row" justifyContent="space-around" alignItems="flex-end">
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
                  </Grid>
                  </Paper>
              </Grid>

            
     </React.Fragment>
    )
  }
