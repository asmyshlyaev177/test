import React, { Component } from 'react';
import{ connect } from 'react-redux'; 
import { addItem, editItem, editStatus, newStatus } from '../store/actions';
import { Row, Col, Input, Icon, DatePicker, Button } from 'antd';

const { TextArea } = Input;

const block = {display: 'block'}

class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        number: 0,
        dueDate: null,
        dateSupply: null,
        comment: ''
      },
      active: false
    }
  }

  generateNumber = () => {
    let numb = Math.trunc(Math.random() * Math.floor(1000000))
    let form = Object.assign({}, this.state.form)
    form.number = numb
    this.setState({form})
  }

  hadleChange = (field, event) => {
    let form = Object.assign({}, this.state.form)
    form[field] = event.target.value
    this.setState({form})
  }

  hadleDateChange = (field, date, dateStr) => {
    let form = Object.assign({}, this.state.form)
    form[field] = date
    this.setState({form})
  }

  setInitial = () => {
    this.generateNumber()
    this.setState({
      form: {
        dueDate: null,
        dateSupply: null,
        comment: ''
      }
    })
  }

  componentWillMount() {
    if (this.props.editForm && this.props.form) {
      this.seState({
        form: {
          number: this.props.form.number,
          dueDate: this.props.form.dueDate,
          dateSupply: this.props.form.dateDupply,
          comment: this.props.form.comment
        }
      })
    } else {
      this.setInitial()
    }
  }

  addNew = () => {
    console.log('new form')
   this.props.newStatus(true)
  }

  render() {
    return (
      <div>
        <Row type="flex" gutter={20}>
        {this.props.statusEdit || this.props.statusNew ? (
          <Col span={16}>
            <form>
              <label>
                Number:
                <Input addonAfter={<Icon type="setting" />}
                 onChange={e => this.hadleChange('number', e)} value={this.state.form.number} />
              </label>
              <label>
                Invoice Date:
                 <DatePicker onChange={(d, s) => this.hadleDateChange('dueDate', d, s)} value={this.state.form.dueDate} />
              </label>
              <label>
                Supply Date:
                 <DatePicker onChange={(d, s) => this.hadleDateChange('dateSupply', d, s)} value={this.state.form.dateSupply} />
              </label>
              <label>
                Comment:
                 <TextArea autosize onChange={e => this.hadleChange('comment', e)} value={this.state.form.comment} />
              </label>
              <Button type="primary">Save</Button>
            </form>
          </Col>
        ) : (
          <Col span={16}>
            <Button type="primary" onClick={this.addNew}>Add new</Button>
          </Col>
          )}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoices,
    statusNew: state.statusNew,
    statusEdit: state.statusEdit,
    form: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editStatus: payload => {
      dispatch(editStatus(payload))
    },
    newStatus: payload => {
      dispatch(newStatus(payload))  
    },
    add: payload => {
      dispatch(addItem(payload)) 
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm)
