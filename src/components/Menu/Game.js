import React from "react";
import { connect } from "react-redux";
import World from "../../features/world/index"
import "./style.css"

const MenuContainer = props => <div className="menu" {...props}></div>

class MenuSelect extends React.Component {
  
  constructor(props) {
    super(props)
    this.itemRefs = []
    this.state = {
      selected: this.props.selected || 0,
      handTop: 0,
      handLeft: 0
    }
    
    this.onKeyDown = this.onKeyDown.bind(this)
    
  }
  
  
  
  componentDidMount() {
    
    let selectedElement = this.itemRefs[this.state.selected]

    this.setState({      
      handTop: selectedElement.offsetTop
    })
    
    window.addEventListener('keydown', this.onKeyDown)
    
  }
  
  componentWillUnmount() {
    
    window.removeEventListener('keydown', this.onKeyDown)
    
  }
  
  
  
  onKeyDown(e) {
    
    if (!this.props.active) {
      return
    }
    
    let inc = true
        
    if (e.keyCode == '40') {      
      inc = true
    } else if (e.keyCode == '38') {      
      inc = false
    } else if ( (e.keyCode == '13') || (e.keyCode == '32') ) {
      if (this.props.onChoice) { 
        this.props.onChoice(this.state.selected)
      }
      return
    } else {      
      return
    }
    
    this.setState(state => {
      let selected = inc ?
          (state.selected + 1) % this.props.items.length :
          (state.selected == 0 ?
            (this.props.items.length - 1) : ((state.selected - 1) % this.props.items.length) )

      let handTop =  this.itemRefs[selected].offsetTop
      
      return { selected, handTop }         
     })
    
    e.preventDefault()
  }
    
  render() {
    return (
        <MenuContainer           
          style={{...this.props.style, paddingLeft: '44px'}}>
        {
          this.props.items.map( (item, index) => 
            <div 
              className="menu_item_wrapper" 
              style={this.props.itemStyle}              
              ref={e => this.itemRefs[index] = e}
              key={index}>
             { this.props.renderItem(item, index) }
            </div>
          )
        }
        {
          this.props.active ?
          <div className="menu_hand" style={{ top: this.state.handTop, left: this.state.handLeft }}>
            <img src="http://res.cloudinary.com/forte-3d/image/upload/v1512749704/hand_gkm8wr.png"/>
          </div>  : null
        }
        </MenuContainer>        
     )
  }
      
}

//////// Start Screen
const Start = ({ start }) =>
  <MenuSelect
    active={true}
    onChoice={start}
    items={["Start Game"]}
    renderItem={ item => <span>{item}</span> }
    >
  </MenuSelect>

//////// Game component

const styles = {
  mainMenuStyle: {
    flex: 1
  }
}

class Game extends React.Component {
  
  render() {
    
      return (
        <div className="game-wrapper">                
          <Start />        
        </div>
      )
            
    
    return (
      <div className="game-wrapper">        
       <World/>
      </div>
    )    
  }  
}


  

export default Game