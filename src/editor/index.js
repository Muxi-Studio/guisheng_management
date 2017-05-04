/* editor 
/* 
/* by stephen 2017.2.20 */

import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw, EditorState, ContentState } from 'draft-js'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import './editor.scss'

export default class MyEditor extends Component {
	constructor(props) {
		super(props)
	}

	state = {
		editorContent : "",
		url:window.location.pathname.slice(7)
	}

	onEditorStateChange = (editorContent) => {
		this.setState({
			editorContent
		})
	}
  
  	componentDidMount() {
  		// var reg = new RegExp('\/[0-9]+')
  		// this.state.id = reg.exec(window.location.pathname)[0]
        fetch(`/api/v1.0${this.state.url}/body/`, {
            method: 'GET',
            headers: {
            'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          	},
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          console.log(value)
        })   	
  	}

	onEditorSubmit = (e) => {	
		const { editorContent } = this.state.editorContent
		if(editorContent) {
			const HTML = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
			e.preventDefault()
			// console.log(HTML)
			var url = window.location.pathname.slice(7)
        fetch(`/api/v1.0${this.state.url}/body/`, {
            method: 'PUT',
            headers: {
            'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          	},
          	body: JSON.stringify({body:HTML})
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          console.log(value)
        })
		}		
	}

	render() {
		const { editorContent } = this.state.editorContent
		return (
			<div className="container">
				<div className="back"><a href="" >返回</a></div>
				<form onSubmit={this.onEditorSubmit}>
					<Editor
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