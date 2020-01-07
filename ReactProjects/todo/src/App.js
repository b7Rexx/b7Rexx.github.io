import React from 'react';
import NavItem from './component/nav-item';
import ListItem from './component/list-item';
import InputComponent from './component/input-component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 'all',
      searchKeyword: '',
      nav: [
        {name: 'Todo', status: 0, type: 'incomplete'},
        {name: 'All', status: 1, type: 'all'},
        {name: 'Completed', status: 0, type: 'complete'},
      ],
      list: props.list || [],
      populateList: props.list || []
    };
  }

  /**
   * nav button event handler
   * @param navIndex - index from this.state.nav
   */
  navEvent = (navIndex) => {
    this.setState({
      nav: this.state.nav.map((value, index) => {
        if (index === navIndex) {
          if (value.status !== 1) {
            value.status = 1;
          }
          this.accumulateList(value.type);
        } else {
          value.status = 0;
        }
        return value;
      })
    });
  };

  /**
   * accumulate list by tab event
   * @param type
   */
  accumulateList(type = 'all') {
    switch (type) {
      case "complete":
        this.setState({
          activeNav: 'complete',
          searchKeyword: '',
          populateList: this.state.list.filter((value) => {
            return value.complete;
          })
        });
        break;
      case "incomplete":
        this.setState({
          activeNav: 'incomplete',
          searchKeyword: '',
          populateList: this.state.list.filter((value) => {
            return !value.complete;
          })
        });
        break;
      default:
        this.setState({
          activeNav: 'all',
          searchKeyword: '',
          populateList: this.state.list
        });
        break;
    }

  }

  /**
   * add list item
   * @param e
   */
  addListItem = (e) => {
    if (e.target.value && e.key === 'Enter') {
      let max = Math.max.apply(null,
        this.state.list.map(function (value) {
          return value.id;
        }));
      this.setState({
        activeNav: 'incomplete',
        list: [{"id": (max + 1), "name": e.target.value, "complete": false}, ...this.state.list]
      }, () => (this.navEvent(0)), e.target.value = '');
    }
  };

  /**
   * edit list item
   * @param e
   * @param itemId
   */
  editListItem(e, itemId) {
    if (e.key === 'Enter') {
      let updateVal = e.target.innerHTML;
      e.target.removeAttribute('contenteditable');
      this.setState({
        list: this.state.list.map((value) => {
          if (value.id === itemId)
            value.name = updateVal;
          return value;
        })
      });
    }
  }

  /**
   * remove item from list
   * @param itemId
   */
  removeListItemHandler(itemId) {
    this.setState({
      list: this.state.list.filter((value) => {
        return value.id !== itemId;
      })
    }, () => this.accumulateList(this.state.activeNav));
  }

  /**
   * check/uncheck complete
   * @param itemId
   */
  completeListItemHandler = (itemId) => {
    this.setState({
      list: this.state.list.map((value) => {
        if (value.id === itemId)
          value.complete = !value.complete;
        return value;
      })
    }, () => this.accumulateList(this.state.activeNav));
  };

  /**
   * search list by name
   * @param e
   */
  searchListItem = (e) => {
    const keyword = e.target.value.toLowerCase();
    // if (e.key === 'Enter') {
    switch (this.state.activeNav) {
      case "complete":
        this.setState({
          populateList: this.state.list.filter((item) => {
            return (item.name).toLowerCase().includes(keyword) && item.complete === true;

          })
        });
        break;
      case "all":
        this.setState({
          populateList: this.state.list.filter((item) => {
            return (item.name).toLowerCase().includes(keyword);
          })
        });
        break;
      default:
        this.setState({
          populateList: this.state.list.filter((item) => {
            return (item.name).toLowerCase().includes(keyword) && item.complete === false;

          })
        });
        break;
      // }
    }
  };

  populateList() {
    if (this.state.populateList.length !== 0) {
      return this.state.populateList.map((value, index) => (
        <ListItem key={index}
                  item={value.name} complete={value.complete}
                  completedEvent={() => this.completeListItemHandler(value.id)}
                  editEvent={(e) => this.editListItem(e, value.id)}
                  removeEvent={() => this.removeListItemHandler(value.id)}/>
      ));
    } else {
      const emptyStyle = {textAlign: 'center', padding: 20, fontSize: 80, color: 'lightgrey'};
      return (
        <li style={emptyStyle}>
          <div style={{fontSize: 20}}>Empty</div>
          <i className='fa fa-list'/>
        </li>
      );
    }
  }

  render() {
    console.log('render');
    return (
      <div className="App">
        <div className="header">
          <div className="header-content">
            <div className="navbar">
              <ul className="nav">
                {this.state.nav.map((value, index) => (
                  <NavItem key={index} item={value.name} status={value.status} onClick={() => this.navEvent(index)}/>
                ))}
              </ul>
            </div>
            <InputComponent label='fa fa-search' iconLabel={true}
                            type='text' placeholder='Search'
                            id='searchTodo' onKeyUp={this.searchListItem}
                            defaultValue={this.state.searchKeyword}/>
            <InputComponent label='fa fa-plus-circle' iconLabel={true}
                            type='text' placeholder='Add Todo'
                            id='addTodo' onKeyUp={this.addListItem}/>
          </div>
        </div>
        <div className="main-list">
          <ul className='todo-list'>
            {this.populateList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
