import React, { Component } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts,searchPosts } from "./graphql/queries";
import { createPost } from "./graphql/mutations";
import { onCreatePost } from "./graphql/subscriptions";
export default class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      posts:[],
      title:"",
      content:"",
      keyword:""
    }
  }

  componentDidMount = async () => {
    try {
      const posts = await API.graphql(graphqlOperation(listPosts))
      this.setState({posts:posts.data.listPosts.items})
      console.log(this.state.posts)      
    } catch (error) {
      console.error(error)
    }

    API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next:(eventData) =>{
        console.log("eventdata:",eventData)
        const post = eventData.value.data.onCreatePost
        const posts = [...this.state.posts.filter(content =>{
          return (content.title!==post.title)
        }),post]
        this.setState({posts})
      }
    })
  }

  createPost = async () =>{

    const createPostInput = {
      title:this.state.title,
      content:this.state.content
    }

    try {
      await API.graphql(graphqlOperation(createPost,{input:createPostInput}))
    } catch (error) {
      console.log(error)
    }
  }

  search = async () =>{
    console.log(this.state.keyword)
    try {
      const ret = await API.graphql(graphqlOperation(searchPosts,{
        filter:{
          or:[
            {content:{wildcard:"*" + this.state.keyword + "*"}},
            {content:{match:this.state.keyword}}
          ]
        },
        limit:2
      }))

      console.log(ret)

      const ret2 = await API.graphql(graphqlOperation(searchPosts,{
        filter:{
          or:[
            {content:{wildcard:"*" + this.state.keyword + "*"}},
            {content:{match:this.state.keyword}}
          ]
        },
        limit:2,
        nextToken:ret.data.searchPosts.nextToken
      }))
      console.log(ret2)


    } catch (error) {
      console.log(error)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderPost = () => {
    return (
    this.state.posts.map((post) => 
      <div>
        <h3>{post.title}</h3>
        <div>{post.content}</div>
      </div>
    ))
  }

  render(){
    return (
      <div className="App">
        <div>
          title
        <input value={this.state.title} name="title" onChange={this.onChange}></input>
        </div>
        <div>
          content
        <input value={this.state.content} name="content" onChange={this.onChange}></input>
        </div>
        <button onClick={this.createPost}>add</button>  
        <div>
          search content
        <input value={this.state.keyword} name="keyword" onChange={this.onChange}></input>
        </div>
        <button onClick={this.search}>search</button>  
        {this.renderPost()}
      </div>
    );
  
  }
}