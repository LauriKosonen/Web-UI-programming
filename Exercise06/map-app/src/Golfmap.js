import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GolfMap = ({ courses }) => {
    const position = [62, 26]
    const zoom = 7
    
    const markers = courses.map((course,index) =>
      <Marker position={[course.lat, course.lng]} key={index} >
        <Popup>
            <b>{course.course}</b><br/>
            {course.address}<br/>
            {course.phone}<br/>
            {course.email}<br/>
            <a href={course.web} target="_blank" rel="noopener noreferrer">{course.web}</a><br/>
            <br/>
            <i>{course.text}</i>
          </Popup>
      </Marker>
    );

    return (
        <MapContainer center={position} zoom={zoom} style={{ width: '100%', height: '100vh' }} className="App">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>     
      );
};

export default GolfMap;