import React from 'react';
import Viewer from "../Viewer"


const configs = {
  id: "mirador",
  selectedTheme: "light",
  window: {
    allowClose: false,
    allowMaximize: false,
    allowTopMenuButton: false,
    defaultSideBarPanel: 'canvas',
    defaultView: 'single',
    sideBarOpenByDefault: true,
  },
  thumbnailNavigation: {
    defaultPosition: 'off',
  },
  workspace: {
    type: 'none',
  },
  workspaceControlPanel: {
    enabled: false,
  },
  panels: {
      info: true,
      attribution: true,
      canvas: true,
  },
  windows: [
    { manifestId: "https://raciif-dev.s3.amazonaws.com/manifests/f430dec48d764f218c2147a846e28704" }
  ]
}

const PageDigitalObject = props => (
  <Viewer config={configs} plugins={[]} />
)

export default PageDigitalObject;
