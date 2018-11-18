import React, { Component } from 'react';
import './App.css';

import Detail from './components/detail'
import search from './assets/images/search.png'

const renderTages = (d=>{
    if(d && d.tags.length>0){
      return d.tags.map((t,index)=>(
            <span key={index} className="user-tag">{t}</span>
          ))
    }
})

export default class App extends Component {
  constructor(){
      super()
      this.state = {
        data:[],
        detailShow:false,
        detail:null,
        searchItems:[],
        searchItemsShow:false,
        sortItemsShow:false,
        sortType:""
      }
      this.searchInput = null;
  }

  componentDidMount(){
     this.loadData()
  }

  loadData = ()=>{

      const {sortType} = this.state
      const searchValue = this.searchInput.value.trim()
    // The sort methods
    fetch("/mocks/data.json").then(res=>res.json()).then(data=>{
      if(searchValue){
         data = data.filter(d=>d.user.name.includes(searchValue))
      }
      if(sortType){
        switch(sortType){
          case "name":
             let nameArray = []
             data.map(d=>nameArray.push(d.user.name+"___"+d.index))
             nameArray.sort()
             data = this.nameSorted(nameArray,data)
          break;
          case "likes":
            data.sort((a,b)=>{
              return b.likes-a.likes
            })
          break;
          case "comments":
            data.sort((a,b)=>{
              return b.comments-a.comments
            })
          break;
          case "age":
            data.sort((a,b)=>{
              return b.user.age-a.user.age
            })
          break;
          default:break;
        }
      }
      this.setState({
        data:data
      })
   })
  }

 // The predictive search
  handelerKeyUp = (e)=>{
    if(this.searchInput){
      let value = this.searchInput.value.trim() // remove the space at tne beginning and the tail of an input
      if(value){
        let searchItems = this.state.data.filter( d => d.user.name.includes(value))
        this.setState({searchItems:searchItems,searchItemsShow:true})
      }else{
        this.setState({searchItemsShow:false})
      }
    }
  }

  // click the image
  handlerImgClick = (d)=>{
      this.setState({
        detail:d,
        detailShow:true
      })
  }

  // search by name, once the name matches the user name, the dropdown will not appear
  handlerSearchItem = (s)=>{
     const name = s.user.name
     this.searchInput.value = name;
     this.setState({
       searchItemsShow:false
     },()=>{this.loadData()})
  }

  // present the search page
  handlerSearch = ()=>{
      this.setState({
          searchItemsShow: false
      }, ()=>{this.loadData()})

  }

  //show the result of the new sort method
  handlerSort = (type)=>{
    this.setState({
      sortItemsShow:!this.state.sortItemsShow
    })
  }

  //chose the sort type
  handlerSortBy = (type)=>{
      this.setState({
        sortItemsShow:false,
        sortType:type
      },()=>{
        this.loadData()
      })

  }

  //the name sort approach
  nameSorted = (nameArray,data)=>{
    let newArray = [];
    for(let i=0;i<nameArray.length;i++){
      let index = nameArray[i].split("___")[1]
      for(let j=0;j<data.length;j++){
        if(data[j].index==index){
          newArray.push(data[j])
        }
      }
    }
    return newArray
  }

  //cycle across the cards, see the previous card
  handlerPrev = ()=>{
    const {detail,data} = this.state
     let index = data.findIndex(d=>{
       return d._id===detail._id
     })
     if(index===0){
        alert("This is first card.")
     }else{
       index--
       this.setState({
         detail:data[index]
       })
     }
  }

  // see the next card
  handlerNext = ()=>{
    const {detail,data} = this.state
    let index = data.findIndex(d=>{
      return d._id===detail._id
    })
     if(index>=(data.length-1)){
        alert("This is last card.")
     }else{
       index++
       this.setState({
         detail:data[index]
       })
     }
  }

  //close the opened image
  handlerClose = ()=>{
    this.setState({
      detailShow:false
    })
  }

  // show the search result
  renderCardList = (data)=>{
     return data.map(d=>(
        <div key={d._id} className="card">
            <img src={d.picture} alt="" onClick={()=>this.handlerImgClick(d)}/>
        </div>
      ))
  }

 // show the predictive search result behind the search bar
  renderSearchItem = (searchItems)=>{
    if(searchItems.length>0){
     return searchItems.map(s=>(
        <li key={s._id} onClick={()=>this.handlerSearchItem(s)}>{s.user.name}</li>
      ))
    }else{
      return (<li>no data</li>)
    }
  }



  render() {
    const {data,detail,detailShow,searchItems,searchItemsShow,sortItemsShow,sortType} = this.state
    const searchItemStyle = {
      display:searchItemsShow?"block":"none"
    }
    const sortItemStyle = {
      display:sortItemsShow?"block":"none"
    }
    return (
      <div className="App">
            <header className="app-header"></header>
            <div className="container">
              <div className="filter-bar">
                <div className="seacrh-box">
                    <div className="search">
                      <input ref={ref=>this.searchInput=ref} type="text" placeholder="Search by Name" onKeyUp={()=>this.handelerKeyUp()}/>
                      <img src={search} alt="" title="search" onClick={()=>this.handlerSearch()}/>
                    </div>
                    <ul className="search-items" style={searchItemStyle}>
                      {this.renderSearchItem(searchItems)}
                    </ul>
                </div>
                <div className="sort-box">
                  <div className="sort" onClick={()=>this.handlerSort()}>
                      <span>Sort By:{sortType}</span>
                  </div>
                  <ul className="sort-items" style={sortItemStyle}>
                    <li onClick={()=>this.handlerSortBy("name")}>Name</li>
                    <li onClick={()=>this.handlerSortBy("age")}>Age</li>
                    <li onClick={()=>this.handlerSortBy("likes")}>Likes</li>
                    <li onClick={()=>this.handlerSortBy("comments")}>Comments</li>
                  </ul>
              </div>
                <div className="clear"></div>
              </div>
              <div className="card-list">
                  {
                      this.renderCardList(data)
                  }
                  <div className="clear"></div>
                </div>
            </div>
            <Detail detailShow={detailShow} onPrev={this.handlerPrev} onNext={this.handlerNext} onClose={this.handlerClose}>
                <div className="modal-content">
                            <div className="modal-content-left">
                                  <img src={detail?detail.picture:""} alt=""/>
                            </div>
                            <div className="modal-content-right">
                                  <div className="user-info">
                                        <div>
                                            <p className="user-name">{detail?detail.user.name:""}</p>
                                            <p className="user-phone">Phone：{detail?detail.user.phone:""}</p>
                                            <p className="user-age">age: {detail?detail.user.age:""}</p>
                                            <p className="user-email">Email：{detail?detail.user.email:""}</p>
                                            <address className="user-address">Address：{detail?detail.user.address:""}</address>
                                        </div>
                                        <div className="user-tags">
                                            {renderTages(detail)}
                                        </div>
                                      <div>
                                          <div className="like-item">
                                              <strong>{detail?detail.likes:0}</strong>
                                              <span>likes</span>
                                          </div>
                                          <div className="comment-item">
                                              <strong>{detail?detail.comments:0}</strong>
                                              <span>comments</span>
                                          </div>
                                      </div>
                                  </div>
                            </div>
                        </div>
            </Detail>
      </div>
    );
  }
}
