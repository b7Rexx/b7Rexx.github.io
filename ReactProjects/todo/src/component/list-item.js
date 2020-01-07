import React from 'react';

class ListItem extends React.Component {

  contentEdit(e) {
    e.target.setAttribute('contenteditable', true);
  }

  render() {
    return (
      <li className='list-item'>
        <a className={'check-todo ' + (this.props.complete ? 'btn-completed' : '')}
           onClick={this.props.completedEvent}>
          <i className={'fa ' + (this.props.complete ? 'fa-check-circle' : 'fa-circle')}/>
        </a>
        <span className={this.props.complete ? 'completed' : ''}
              onKeyDown={this.props.editEvent}
              onClick={(e) => this.contentEdit(e)}>{this.props.item}</span>
        <a className='remove-todo'
           title='remove' onClick={this.props.removeEvent}>
          <i className='fa fa-trash'/>
        </a>
      </li>
    );
  }
}

export default ListItem;
