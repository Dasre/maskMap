import React, { Component } from 'react';
import L from 'leaflet';
import {
  Map as Maps, TileLayer, Marker, Popup,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMaskData, getCoordinates, getNowSelectData } from '../redux/actions';

class Map extends Component {

  componentDidMount() {
    this.props.getMaskData();
    this.props.getCoordinates();
  }

  handleClick = (event) => {
    const { lng } = event.latlng;
    const { data } = this.props;
    const oneData = data.filter(da => da.geometry.coordinates[0] === lng);
    this.props.getNowSelectData(oneData);
  }

  render() {
    const myIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const redIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const greenIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const { center, data } = this.props;

    let lists = data.map((dataInfo) => (
      <Marker
        key={dataInfo.properties.id}
        position={[dataInfo.geometry.coordinates[1], dataInfo.geometry.coordinates[0]]}
        icon={dataInfo.properties.mask_adult < 100 || dataInfo.properties.mask_child < 50 ? redIcon : greenIcon}
        onClick={this.handleClick}
      >
        <Popup>
          <h2>{dataInfo.properties.name}</h2>
          <br />
          電話：
          <b>{dataInfo.properties.phone}</b>
          <br />
          <label htmlFor="adult">
            成人口罩：
            <Label
              circular
              color={dataInfo.properties.mask_adult > 100 ? 'green' : 'red'}
            >
              {dataInfo.properties.mask_adult}
            </Label>
          </label>
          <br />
          <label htmlFor="child">
            兒童口罩：
            <Label
              circular
              color={dataInfo.properties.mask_child > 25 ? 'green' : 'red'}
            >
              {dataInfo.properties.mask_child}
            </Label>
          </label>
        </Popup>
      </Marker>
    ))

    return (
      <>
        <Maps center={center} zoom={16} maxZoom={18} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup>
            {lists}
          </MarkerClusterGroup>
          <Marker position={center} icon={myIcon}>
            <Popup>
              你的所在位置！！！
            </Popup>
          </Marker>
        </Maps>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  center: state.center,
  zoom: state.zoom,
  data: state.data,
});

export default connect(
  mapStateToProps,
  { getMaskData, getCoordinates, getNowSelectData },
)(Map);
