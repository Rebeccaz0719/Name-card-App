import React,{ Component } from 'react'

import './detail.css'
import previous from '../../assets/images/previous.png'
import next from '../../assets/images/next.png'
import close from '../../assets/images/close.png'
export default class Detail extends Component{

    render(){
        const  {detailShow,onPrev,onNext,onClose} = this.props
        const visibleStyle = {
            display:detailShow?"block":"none"
        }
        return(
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
                    {this.props.children}
               </div>
            </div>
        )
    }
}