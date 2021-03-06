import { Table, Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStatus, setForm, loadItems, removeItem } from '../store/actions';
import axios from 'axios';

class TableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {title: 'Created', dataIndex: 'date_created', key: 'date_created', width: 150},
        {title: 'No', dataIndex: 'number', key: 'number', width: 120},
        {title: 'Supply', dataIndex: 'date_supply', key: 'date_supply', width: 150},
        {title: 'Comment', dataIndex: 'comment', key: 'comment', width: 400},
        {title: 'Action', key: 'action',
          render: (item, row, index) => {
            return (
              <div>
              <Button onClick={() => this.edit(item)}>Edit</Button>
              <Button type="danger" onClick={() => this.remove(item)}>Remove</Button>
              </div>
            )
          },
          width: 150}
]
    }
    axios.get('http://127.0.0.1:3000/invoices')
      .then(data => this.props.load(data.data))
  }
 
  remove = item => {
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:3000/invoices/' + item.id,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(data => this.props.removeItem(item.id))
  }

  edit = item => {
    let index = this.props.invoices.indexOf(item)
    this.props.setForm(item, index)
    this.props.editStatus(true)
  }

  render() {
    return (
      <div style={{padding: '20px', background: '#fff', margin: '10px', border: '1px gray solid'}}>
        <h4>Invoices</h4>
        <Table pagination={false} columns={this.state.columns}
         size={'middle'}
         rowKey={r => r.id} dataSource={this.props.invoices} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: payload => {
      dispatch(loadItems(payload))
    },
    setForm: (item, index) => {
      dispatch(setForm({form: item, formIndex: index}))
    },
    removeItem: id => {
      dispatch(removeItem(id))
    },
    editStatus: payload => {
      dispatch(editStatus(payload))  
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList);
