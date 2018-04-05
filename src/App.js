import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './components/Table';
import { Layout } from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <Content>
          <Table />
        </Content>
        <Footer />
      </Layout>
    );
  }
}
export default connect()(App);
