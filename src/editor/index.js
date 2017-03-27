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
		editorContent : ""
	}

	onEditorStateChange = (editorContent) => {
		this.setState({
			editorContent
		})
	}

	onEditorSubmit = (e) => {	
		const { editorContent } = this.state 
		if(editorContent) {
			const HTML = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
			e.preventDefault()
		}		
	}

	render() {
		const { editorContent } = this.state 
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