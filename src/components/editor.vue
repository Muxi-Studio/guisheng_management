<template>
  <div>
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <div class="submitbtn">
      <el-button type="primary"  @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>  
import Cookie from '../cookie.js'
  export default {
    data () {
      return {
        content: '',
        url:'',
        editorOption: {
          modules: {
              toolbar: {
                container: [              
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'font': [] }],
                  [{ 'align': [] }],
                  ['link', 'image'],
                  ['clean']],
                handlers: {
                  image: this.imageHandler
                }
              }
          },
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      imageHandler() {
          var range = this.editor.getSelection();
          var value = prompt('请输入图片URL');
          this.editor.insertEmbed(range.index, 'image', value, Quill.sources.USER);
      },
      handleSubmit(){
        const saver = Cookie.getCookie("uid")
        fetch(`/api/v1.0${this.url}/body/`, {
            method: 'PUT',
            headers: {
              'Authorization': Cookie.getCookie("token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({body:this.content,saver:saver})
            }).then((res) =>{
              return res.json()
            }).then(value =>{
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });              
            })
        }
      },
    // get the current quill instace object.
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
        this.url = this.$route.name.replace(/\/editor/i,'')  + '/' + this.$route.params.id
        fetch(`/api/v1.0${this.url}/body/`, {
            method: 'GET',
            headers: {
            'Authorization': Cookie.getCookie("token"),
            },
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          this.content = value.body
        })
      }
  }
</script>

<style>
  .ql-container .ql-editor {
    min-height: 50em;
    padding-bottom: 1em;
    max-height: 70em;
  }
  .submitbtn{
    margin-top: 30px;
    text-align: center;
  }
</style>