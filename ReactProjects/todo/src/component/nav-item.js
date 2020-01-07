import React from 'react';

class NavItem extends React.Component {
  render() {
    return (
      <li
        className={"nav-item " + (this.props.status ? 'active' : '')}
        onClick={this.props.onClick}>
        {this.props.item}
      </li>
    );
  }
}

export default NavItem;
