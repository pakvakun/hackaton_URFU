import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import RadioIcon from '@material-ui/icons/Radio';
import MenuIcon from '@material-ui/icons/Menu';

import axios from 'axios';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      folders: Array(100).fill(0)
    }
  }
  
  getAccess = () => {
    // axios({
    //   method: 'GET',
    //   url: '/authorize',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   params: {
    //     response_type: 'token',
    //     client_id: '3f4e43ddc6894a26ba243cf1e9713a09'
    //   },
    //   withCredentials: true,
    // }).then(res => {
    //   console.log(res)
    // }).catch(err=> {
    //   console.log(err);
      
    // })
    // fetch('/authorize',{
    //       response_type: 'token',
    //       client_id: '3f4e43ddc6894a26ba243cf1e9713a09'
    //     })
    // .then(res => {
    //     console.log(res)
    //   }).catch(err=> {
    //     console.log(err);
        
    //   })
  }
  getFiles = () => {
    axios({
      method: 'GET',
      url: 'https://cloud-api.yandex.net/v1/disk/resources?path=/',
      params: {
      },
      headers:{
        Authorization: 'OAuth AgAAAAAgkRAOAAXql4WmKYyi5EN0oNXIIFrhtYQ'
      }
    }).then(res => {
      this.setState({filesNFolders: res.data._embedded.items, path: res.data.path.replace(/disk:/gi, '')})
      console.log(res)
    }).catch(err=> {
      console.log(err);
      
    })
  }
  goToFolder = (path) => {
    axios({
      method: 'GET',
      url: `https://cloud-api.yandex.net/v1/disk/resources?path=${path}`,
      params: {
      },
      headers:{
        Authorization: 'OAuth AgAAAAAgkRAOAAXql4WmKYyi5EN0oNXIIFrhtYQ'
      }
    }).then(res => {
      this.setState({filesNFolders: res.data._embedded.items, path: res.data.path.replace(/disk:/gi, '')})
      console.log(res)
    }).catch(err=> {
      console.log(err);
      
    })
  }
  handleClickBack= () => {
    let newPath = this.state.path.split('/')
    console.log(newPath)
    newPath = newPath.slice(0, newPath.length-1)
    console.log(newPath)
    if (newPath.length === 1) {
        newPath='/'
    }else{
      newPath = newPath.join('/')
    }
    axios({
      method: 'GET',
      url: `https://cloud-api.yandex.net/v1/disk/resources?path=${newPath}`,
      params: {
      },
      headers:{
        Authorization: 'OAuth AgAAAAAgkRAOAAXql4WmKYyi5EN0oNXIIFrhtYQ'
      }
    }).then(res => {
      this.setState({filesNFolders: res.data._embedded.items, path: res.data.path.replace(/disk:/gi, '')})
      console.log(res)
    }).catch(err=> {
      console.log(err);
      
    })
  }
  componentDidMount(){
    // this.getFiles()
    this.getAccess()
  }
  render(){
    let {filesNFolders, path} = this.state
    return(
        <Grid container style={{flexGrow: 1}} spacing={2}>
          <AppBar position="fixed" style={{paddingLeft: 0, width: '100%', backgroundColor: '#dedede'}}>
            <Toolbar>
              {
                path !== '/' &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // edge="center"
                onClick={this.handleClickBack}
                style={{marginRight: '16px', zIndex: 999}}
              >
                    <ArrowBackIosIcon style={{marginLeft: 5}}/>
              </IconButton>
              }
              <a href='https://oauth.yandex.ru/authorize?response_type=token&client_id=3f4e43ddc6894a26ba243cf1e9713a09&redirect_uri=http://localhost:3000/'>
              <Typography variant="h6" noWrap style={{position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center'}}>
                Тестовое Hackaton_URFU
              </Typography>
              </a>
                
              <Typography variant="h6" noWrap>
                Путь: {path}
              </Typography>
            </Toolbar>
          </AppBar>
            <Grid item xs={12} style={{paddingLeft:'5%',paddingRight:'5%', paddingTop: 100}}>
              <Grid container justify="flex-start" spacing={4}>
                {filesNFolders && filesNFolders.map((item, index) => (
                  <Grid key={index} item onClick={()=>this.goToFolder(item.path)}>
                    <Paper style={{color: '#dedede', display: 'flex', justifyContent: 'center'}}>
                      {
                        item.media_type === 'compressed'
                        ?   <ArchiveIcon style={{width: 100, height: 100}}/>
                        :   item.media_type === "image"
                        ?   <ImageIcon style={{width: 100, height: 100}}/>
                        :   item.media_type === "video"
                        ?   <MovieIcon style={{width: 100, height: 100}}/>
                        :   item.type === "dir"
                        ?   <FolderIcon style={{width: 100, height: 100}}/>
                        :   item.media_type === "audio"
                        ?   <RadioIcon style={{width: 100, height: 100}}/>
                        :   <InsertDriveFileIcon style={{width: 100, height: 100}}/>
                      }
                    </Paper>
                    <Typography variant="h6" style={{paddingTop: 10}}>{item.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
    )
  }
}