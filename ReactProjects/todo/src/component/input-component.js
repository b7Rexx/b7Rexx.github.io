import React from 'react';

class InputComponent extends React.Component {

  getLabel() {
    if (this.props.iconLabel === true) {
      return (
        <label htmlFor={this.props.id}
               className={this.props.iconLabel ? 'icon-label' : ''}>
          <i className={this.props.label}/>
        </label>
      );
    } else {
      return (
        <label htmlFor={this.props.id}> {this.props.label} </label>
      );
    }
  }

  render() {
    return (
      <div className='input-component'> {this.getLabel()}
        <input id={this.props.id}
               type={this.props.type}
               placeholder={this.props.placeholder}
               onKeyUp={
                 (e) => this.props.onKeyUp(e)}
               defaultValue={this.props.defaultValue}
        />
      </div>
    );
  }
}

export default InputComponent;
