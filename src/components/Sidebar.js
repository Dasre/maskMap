import React, { Component } from 'react';
import {
  Input, Menu, Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { getTargetPosition, getCoordinates } from '../redux/actions'
import { connect } from 'react-redux';
import Pharmacy from './Pharmacy';

const SearchBox = styled(Menu.Item)`
  background: #EFF8FF !important;
`;

const NowPosition = styled.div`
  margin-bottom: 10px;
`;


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  changeState = (event) => {
    this.setState({input:event.target.value})
  }

  getPosition = () => {
    this.props.getTargetPosition(this.state.input);
  }

  render() {

    return (
      <Menu vertical style={{ height: '100vh', width: '100%' }}>
        <SearchBox>
          <NowPosition>
            目前位置：
            <Button
              content="取得目前位置" 
              primary 
              onClick={this.props.getCoordinates}
            />
          </NowPosition>
          <div>
            <Input 
              id="search" 
              icon="search"
              value={this.state.input} 
              onChange={this.changeState}
            />
            <Button content="搜尋" primary onClick={this.getPosition} />
            <p>搜尋所在縣市、地址、周招店家名稱等</p>
          </div>
          
          
        </SearchBox>
        {this.props.nowData.length !== 0 ? <Pharmacy /> : null}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  nowData: state.nowData,
});

export default connect(
  mapStateToProps,
  { getTargetPosition, getCoordinates },
)(Sidebar);