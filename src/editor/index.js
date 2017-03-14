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
		this.state = {
			editorState : " "
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState
		})
	}

	onEditorSubmit = (e) => {
		alert('提交成功!')
		const _editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''))
		this.setState({
			editorState: _editorState
		})
		e.preventDefault()
	}

	render() {
		const { editorState } = this.state 
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
					<textarea 
					   disabled 
					   className="text" 
					/>
					<input type="submit" value="提交" /> 
				</form>
			</div>
		)
	}
} 