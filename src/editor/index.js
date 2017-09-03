/* editor 
/* 
/* by stephen 2017.2.20 */
import React, { Component } from 'react'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html'
import Cookie from '../cookie.js'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import './editor.scss'

var urlreg = new RegExp('\/([a-z]+)\/([0-9\/]+)')
var path = window.location.pathname
var result = path.match(urlreg)[0]

export default class MyEditor extends Component {
	constructor(props) {
		super(props)
		this.url = result
	}

	state = {
		editorState : EditorState.createEmpty(),
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState
		})
	}
  
  	componentDidMount() {
        fetch(`/api/v1.0${this.url}/body/`, {
            method: 'GET',
            headers: {
            'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
          	},
        }).then((res) =>{
          return res.json()
        }).then(value =>{
        	console.log(value.body)
        	if(value.body){
				const blocksFromHtml = htmlToDraft(value.body);
				const contentBlocks = blocksFromHtml.contentBlocks;
				const contentState = ContentState.createFromBlockArray(contentBlocks);
				const editorState = EditorState.createWithContent(contentState);
				this.setState({editorState})
			}
        })   	
  	}

	onEditorSubmit = (e) => {
		e.preventDefault()
		const { editorState } = this.state
		if(editorState) {
			const HTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
			const saver = Cookie.getCookie("uid")
			e.preventDefault()
        fetch(`/api/v1.0${this.url}/body/`, {
            method: 'PUT',
            headers: {
	            'Authorization': Cookie.getCookie("token"),
			    'Content-Type': 'application/json'
          	},
          	body: JSON.stringify({body:HTML,saver:saver})
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          console.log(value)
        })
		}		
	}

	render() {
		return (
			<div className="container">
				<div className="back"><a href="" >返回</a></div>
				<form onSubmit={this.onEditorSubmit}>
					<Editor
					   editorState={this.state.editorState}
					   hashtag={{}}
					   wrapperClassName="wrapper" 
					   editorClassName="editor" 
					   toolbarClassName="toolbar" 
					   onEditorStateChange={this.onEditorStateChange}
					/>
					<input type="submit" value="提交" /> 
				</form>
			</div>
		)
	}
} 