import React from 'react';
import Viewer from "../Viewer"

const PageDigitalObject = props => {

  const configs = {
    id: "root",
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
      { manifestId: `https://raciif-dev.s3.amazonaws.com/manifests/${props.match.params.id}` }
    ]
  }

  return (
    <Viewer config={configs} plugins={[]} />
  )
}

export default PageDigitalObject;
