import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import i18next from 'i18next';
import { blueprintUpdate, getBlueprintsByName, getBlueprintsList } from '../../api/blueprint.api';
import PropTypes from 'prop-types';


class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        //console.log ("EJECUTANDO CONSTRUCTOR",props.file)
        this.htmlLoading = true;
        this.modified = false;
        this.fileName = "";
        this.state = {
                editorState: EditorState.createEmpty(),
              };
      }
  

    onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };

    onContentStateChange: Function = (contentState) => {
        this.setState({
          contentState,
        });
        this.modified = true;
      };

    onClickSave: Function = (event) => {
       const { editorState } = this.state;
       console.log("SAVING")
       if (this.fileName===""){
          
       }
       var value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
       //console.log("VALUE", value)
       blueprintUpdate(this.props.fileName, value).then((result)=>{
         
            console.log(result)
            if (result.status==="success"){
                console.log("ARCHIVO GUARDADO")
                this.modified = false;
            }
            if (result.status==="error"){
                console.log("SE HA PRODUCIDO UN ERROR")
            }
       })

    };

      
    render() {
      var { editorState } = this.state;
      if (this.props.file !=="" && this.htmlLoading){
        const contentBlock = htmlToDraft(this.props.file);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
        this.htmlLoading = false;
        this.fileName = this.props.fileName;
      }
      else{
        console.log("NO HAY HTML")
      }
      
      return (
        <React.Fragment>
            <Grid container sx={{mt:2, mb:2}}>
            {<Button variant="contained" disabled={!this.modified} onClick={this.onClickSave}>{i18next.t("save")}</Button>}
            </Grid>
            <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange = {this.onContentStateChange}
                wrapperStyle={{}}
                editorStyle={{}}
                toolbarStyle={{}}
               
            />
          
         </React.Fragment>
        
      );
    }
  }

export default function BlueprintForm() {

    const [textList, setTextList] = React.useState("");
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [filesList, setFilesList] = React.useState([])
    const [editingFile, setEditingFile]= React.useState("");
    
    const handleConsentFormChange = (event)=>{
        setTextList(event.target.value)
        getBlueprintsByName(event.target.value).then((data)=>{
            setEditingFile(data)
        })
    }
   
    React.useEffect(()=>{
        if (firstLoad){
            getBlueprintsList().then((files)=>{
                setFilesList(files);
            })
            setFirstLoad(false);
        }

    },[firstLoad])
    
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} sm={4} md={4} sx={{mt:2, mr:2}}>
                    <TextField
                        id="select-consent-form"
                        select
                        label={i18next.t("selecttheconsentform")}
                        value={textList}
                        onChange={handleConsentFormChange}
                        helperText={i18next.t("selecttheconsentform")}
                        variant="standard"
                        fullWidth
                        sx={{mr:2}}
                        
                    >
                        {filesList.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
       
            </Grid>
            {<EditorConvertToHTML file={editingFile} fileName={textList}/>}
        </React.Fragment>
    )
}