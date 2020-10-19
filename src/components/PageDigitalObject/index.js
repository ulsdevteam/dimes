import React from 'react';
import Viewer from "../Viewer"


const configs = {
  id: "mirador",
  selectedTheme: "dark",
  window: {
    allowClose: false,
    allowMaximize: false,
    defaultSideBarPanel: 'info',
    defaultView: 'gallery',
    sideBarOpenByDefault: true,
  },
  thumbnailNavigation: {
    defaultPosition: 'off',
  },
  workspace: {
    type: 'mosaic',
  },
}

const PageDigitalObject = props => (
 <Viewer config={configs} plugins={[]} />
)

export default PageDigitalObject;
