import React from 'react';
import MaterialIcon from "../MaterialIcon";
import Viewer from "../Viewer"
import "./styles.scss"

const PageDigitalObject = props => {

  const configs = {
    id: "mirador",
    selectedTheme: "rac",
    themes: {
      rac:{
        palette: {
          type: 'dark',
          primary: {
            main: '#ffffff',
          },
          secondary: {
            main: '#2F2F2F',
          },
          shades: {
            main: '#000000',
            dark: '#2F2F2F',
            light: '#000000',
          },
          background: {
            paper: '#000000',
          },
        },
        typography:{
          fontFamily: ['Lato', 'sans-serif'],
          body1: {
            color: '#ffffff',
          },
          h3: {
            color: '#ffffff',
          },
          h4: {
            color: '#ffffff',
          },
          overline: {
            color: '#ffffff',
          }
        }
      }
    },
    thumbnailNavigation: {
      defaultPosition: 'off',
    },
    window: {
      allowClose: false,
      allowMaximize: false,
      allowTopMenuButton: false,
      defaultSideBarPanel: 'canvas',
      defaultView: 'single',
      hideWindowTitle: false,
      sideBarOpen: true,
      panels: {
          info: true,
          attribution: false,
          canvas: true,
      }
    },
    workspace: {
      showZoomControls: true
    },
    workspaceControlPanel: {
      enabled: false,
    },
    windows: [
      { manifestId: `${process.env.REACT_APP_S3_BASEURL}/manifests/${props.match.params.id}` }
    ]
  }

  const itemUrl = (
    document.referrer && document.referrer.includes(`/${props.match.params.type}/${props.match.params.id}`) && !document.referrer.endsWith("/view") ?
      document.referrer : `/${props.match.params.type}/${props.match.params.id}`
  )

  return (
    <div className="digital">
      <nav>
        <a href={itemUrl} className="btn btn--back-item">
          <MaterialIcon icon="keyboard_arrow_left"/>Back to Item Details
        </a>
      </nav>
      <Viewer config={configs} plugins={[]} />
    </div>
  )
}

export default PageDigitalObject;
