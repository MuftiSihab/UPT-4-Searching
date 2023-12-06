import React, { Component } from 'react';
import Modals from './Modals';

export default class ModalContainer extends Component {
    state = {
        active: false
      }
    
      toggle = () => this.setState({ active: !this.state.active })

      handleSave = () => {
        this.props.save();
        this.toggle();
      }
    
      render() {
        const { modalTitle, buttonTitle, content, step} = this.props;
    
        return (
            <>
                <button 
                    className="button is-small is-info"
                    onClick={this.toggle}
                >
                        {buttonTitle}
                </button>
                
                <Modals
                    active={this.state.active}
                    title={modalTitle}
                    content={content}
                    toggle={this.toggle}
                    handleSave={this.handleSave}
                >
                    {step}
                </Modals>
            </>
                
        )
    }
}
