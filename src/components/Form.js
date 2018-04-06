import React, { Component } from 'react';
import{ connect } from 'react-redux'; 
import { saveEdited, addItem, editItem, editStatus, newStatus } from '../store/actions';
import { Row, Col, Input, Icon, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;

class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        number: 0,
        dateDue: null,
        dateSupply: null,
        comment: ''
      },
      active: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.statusEdit && JSON.stringify(nextProps.form) !== JSON.stringify(prevState.form)) {
      return {
        form: {
          id: nextProps.form.id,
          direction: nextProps.form.direction,
          number: nextProps.form.number,
          dateDue: moment(nextProps.form.date_due).isValid() ? moment(nextProps.form.date_due) : moment(),
          dateSupply: moment(nextProps.form.date_supply).isValid() ? moment(nextProps.form.date_supply) : moment(),
          comment: nextProps.form.comment
        }
      }
    } else {
      return null
    }
  }

  generateNumber = () => {
    let numb = Math.trunc(Math.random() * Math.floor(1000000))
    return numb
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
    this.setState({
      form: {
        dateDue: moment(),
        dateSupply: moment(),
        comment: '',
        number: this.generateNumber()
      }
    })
  }


  getRandomText = length => {
    if (!length) length = 18
    return btoa(Math.random()).toLowerCase().substring(0, length)
  }

  getDirection = () => {
    return `${this.getRandomText(8)}-${this.getRandomText(4)}-${this.getRandomText(4)}-${this.getRandomText(8)}`
  }

  addNew = () => {
    this.setInitial()
    this.props.newStatus(true)
  }

  saveBtn = () => {
      let form = {
        id: this.getRandomText(24),
        direction: this.getDirection(),
        date_created: moment().format('DD MMMM YYYY'),
        number: this.state.form.number,
        date_due: moment(this.state.form.dateDue).format('DD MMMM YYYY'),
        date_supply: moment(this.state.form.dateSupply).format('DD MMMM YYYY'),
        comment: this.state.form.comment
      }
    if (this.props.statusEdit) {
      form.id = this.props.form.id
      form.number = this.state.form.number
      form.date_supply = moment(this.state.form.dateSupply).isValid() ? moment(this.state.form.dateSupply).format('DD MMMM YYYY') : ''
      form.date_due = moment(this.state.form.dateDue).isValid() ? moment(this.state.form.dateDue).format('DD MMMM YYYY') : ''
      form.direction = this.state.form.direction
      form.comment = this.state.form.comment
      form.date_created = this.props.form.date_created

      axios({
        method: 'put',
        url: `http://127.0.0.1:3000/invoices/${form.id}`,
        headers: { 'Content-Type': 'application/json' },
        data: form
      })
        .then(data => {
          this.props.saveEdited(form)
          this.props.editStatus(false)
        })
    } else {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/invoices/',
        headers: { 'Content-Type': 'application/json' },
        data: form
      })
        .then(data => {
          this.props.add(form)
          this.props.newStatus(false)
        })
    }
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
                 <DatePicker onChange={(d, s) => this.hadleDateChange('dateDue', d, s)} value={this.state.form.dateDue} />
              </label>
              <label>
                Supply Date:
                 <DatePicker onChange={(d, s) => this.hadleDateChange('dateSupply', d, s)} value={this.state.form.dateSupply} />
              </label>
              <label>
                Comment:
                 <TextArea autosize onChange={e => this.hadleChange('comment', e)} value={this.state.form.comment} />
              </label>
              <Button type="primary" onClick={this.saveBtn}>Save</Button>
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
    formIndex: state.formIndex,
    form: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEdited: payload => {
      dispatch(saveEdited(payload))
    },
    editStatus: payload => {
      dispatch(editStatus(payload))
    },
    newStatus: payload => {
      dispatch(newStatus(payload))  
    },
    add: payload => {
      dispatch(addItem(payload)) 
    },
    editItem: (item, ind) => {
      dispatch(editItem(item, ind))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm)
