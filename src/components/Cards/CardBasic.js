import React, { Component } from 'react';

/**
 * basic card component inspired of the SB Admin 2 theme
 */
class CardBasic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    this.setState({ title: this.props.title ? this.props.title : 'Basic Card Example' });
  }

  render() {
    return (
      <div className="card border-bottom-primary shadow mb-4">
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CardBasic;