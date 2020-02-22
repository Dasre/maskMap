import React from 'react';
import { Card, List, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Cards = styled(Card)`
  margin-left: 1em !important;
  margin-right: 1em !important;
`;

const Pharmacy = ({ nowData }) => (
  <>
    <Cards>
      <Card.Content header={nowData.select[0].properties.name} />
      <Card.Content>
        <List bulleted>
          <List.Item>電話：{nowData.select[0].properties.phone}</List.Item>
          <List.Item>地址：{nowData.select[0].properties.address}</List.Item>
          <List.Item>
            成人口罩：
            <Label
              horizontal
              color={nowData.select[0].properties.mask_adult > 100 ? 'green' : 'red'}
            >
              {nowData.select[0].properties.mask_adult}
            </Label>
          </List.Item>
          <List.Item>
            兒童口罩：
            <Label
              horizontal
              color={nowData.select[0].properties.mask_child > 50 ? 'green' : 'red'}
            >
              {nowData.select[0].properties.mask_child}
            </Label>
          </List.Item>
          <List.Item>
            營業時間：
            {nowData.select[0].properties.note}
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content extra>
        此資料最後更新時間：
        {nowData.select[0].properties.updated}
      </Card.Content>
    </Cards>
  </>
)


const mapStateToProps = (state) => ({
  nowData: state.nowData,
});

export default connect(
  mapStateToProps,
  null,
)(Pharmacy);
