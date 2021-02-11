import React, { Component } from 'react'
import mirador from 'mirador'

class Viewer extends Component {
  componentDidMount () {
    const { config, plugins } = this.props
    mirador.viewer(config, plugins)
  }

  render () {
    const { config } = this.props
    return <div id={config.id} />
  }
}

export default Viewer
