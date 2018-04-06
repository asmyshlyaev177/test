import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './components/Table';
import AddForm from './components/Form';
import { Layout, Row, Col } from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <Content>
          <Row justify="center">
            <Col span={20}>
              <AddForm />
              <Table />
            </Col>
         </Row>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
export default connect()(App);
