var _ = require('lodash');
var React = require('react');

var Geo = React.createClass({

  // Note: Keen API standard is Longitude followed by Latitude.
  render: function() {
    return (
      <div>
        <div className="col-md-12">
          <label htmlFor="amount">Longitude</label>
          <input type="text"
                 name="coordinates.0"
                 className="form-control"
                 value={this.props.filter.property_value.coordinates[0] || ""}
                 onChange={this.props.handleChange} />
        </div>
        <div className="col-md-12">
          <label htmlFor="amount">Latitude</label>
          <input type="text"
                 name="coordinates.1"
                 className="form-control"
                 value={this.props.filter.property_value.coordinates[1] || ""}
                 onChange={this.props.handleChange} />
        </div>
        <div className="col-md-12">
          <label htmlFor="amount">Radius in Miles</label>
          <input type="text"
                 name="max_distance_miles"
                 className="form-control"
                 value={this.props.filter.property_value.max_distance_miles || ""}
                 onChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
});

module.exports = Geo;