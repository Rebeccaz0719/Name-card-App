import React from 'react'
import './detail.css'
import previous from '../../assets/images/previous.png'
import next from '../../assets/images/next.png'
import close from '../../assets/images/close.png'

export const Detail  = (props) => {
  const { detailShow , onPrev, onNext, onClose, ddetail} = props
  const visibleStyle = {
    display:detailShow?"block":"none"
  }
  const renderTages = (d=>{
        if(d && d.tags.length>0){
            return d.tags.map((t,index)=>(
                <span key={index} className="user-tag">{t}</span>
            ))
        }
    })

  return (
    <div className="detail-container" style={visibleStyle}>
        <div className="modal-mask"></div>
          <div className="detail-modal">
              <div className="modal-header">
                  <div className="change-item">
                      <img src={previous} alt="" className="prev-item" title="previous" onClick={onPrev}/>
                      <img src={next} alt="" className="next-item" title="next" onClick={onNext}/>
                  </div>
                  <div className="modal-close">
                      <img src={close} alt="" className="close-img" title="close" onClick={onClose}/>
                  </div>
              </div>
              <div className="modal-content">
                  <div className="modal-content-left">
                      <img src={ddetail?ddetail.picture:""} alt=""/>
                  </div>
                  <div className="modal-content-right">
                      <div className="user-info">
                          <div>
                              <p className="user-name">{ddetail?ddetail.user.name:""}</p>
                              <p className="user-phone">Phone：{ddetail?ddetail.user.phone:""}</p>
                              <p className="user-age">age: {ddetail?ddetail.user.age:""}</p>
                              <p className="user-email">Email：{ddetail?ddetail.user.email:""}</p>
                              <address className="user-address">Address：{ddetail?ddetail.user.address:""}</address>
                          </div>
                          <div className="user-tags">
                              {renderTages(ddetail)}
                          </div>
                          <div>
                              <div className="like-item">
                                  <strong>{ddetail?ddetail.likes:0}</strong>
                                  <span>likes</span>
                              </div>
                              <div className="comment-item">
                                  <strong>{ddetail?ddetail.comments:0}</strong>
                                  <span>comments</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>



  )
}

