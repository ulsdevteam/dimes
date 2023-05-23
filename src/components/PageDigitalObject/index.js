import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import Viewer from '../Viewer'
import { firePageViewEvent } from '../Helpers'
import './styles.scss'

const PageDigitalObject = ({isMobile}) => {

  const [itemTitle, setItemTitle] = useState("")
  const { id, type } = useParams()

  /** Fetches and sets item title */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${type}/${id}`)
      .then(res =>  {
        setItemTitle(res.data.title)})
      .catch(err => console.log(err))
    }, [id, type])

  const configs = {
    id: 'mirador',
    selectedTheme: 'rac',
    themes: {
      rac: {
        palette: {
          type: 'dark',
          primary: {
            main: '#ffffff'
          },
          secondary: {
            main: '#2F2F2F'
          },
          shades: {
            main: '#000000',
            dark: '#2F2F2F',
            light: '#000000'
          },
          background: {
            paper: '#000000'
          }
        },
        typography: {
          fontFamily: ['Lato', 'sans-serif'],
          body1: {
            color: '#ffffff'
          },
          h3: {
            color: '#ffffff'
          },
          h4: {
            color: '#ffffff'
          },
          overline: {
            color: '#ffffff'
          }
        }
      }
    },
    thumbnailNavigation: {
      defaultPosition: 'off'
    },
    window: {
      allowClose: false,
      allowMaximize: false,
      allowTopMenuButton: false,
      defaultSideBarPanel: 'canvas',
      defaultView: 'single',
      hideWindowTitle: false,
      sideBarOpen: !isMobile,
      panels: {
        info: true,
        attribution: false,
        canvas: true
      }
    },
    workspace: {
      showZoomControls: true
    },
    workspaceControlPanel: {
      enabled: false
    },
    windows: [
        { manifestId: `${process.env.REACT_APP_S3_BASEURL}/manifests/${id}` }
    ]
  }

  const splitPath = document.referrer && document.referrer.split("?")
  const params = (splitPath && splitPath.length === 2 ) ? `?${splitPath[1]}` : null

  /** Constructs url for Back to Item Details link */
  const itemUrl = (
    params ? `/${type}/${id}${params}` : `/${type}/${id}`
  )

  /** Custom top bar which includes additional classes  so we can style things as we want to **/
  const CustomTopBarTitle = ({ TargetComponent, targetProps  }) => (
    <div className='viewer-bar'>
      <div className='viewer-bar__title'>
        <TargetComponent {...targetProps} />
      </div>
      <div className='viewer-bar__buttons'>
        <a className='btn btn--sm btn--orange'
          href={`${process.env.REACT_APP_S3_BASEURL}/pdfs/${id}`}
          target='_blank'
          title='opens in a new window'
          rel='noopener noreferrer'
          ><MaterialIcon icon='get_app' className='material-icon--space-after' /> Download</a>
        <a href={itemUrl} className='btn btn--sm btn--black'>
          <MaterialIcon icon='keyboard_arrow_left' className='material-icon--space-after' />Back to Item Details</a>
      </div>
    </div>
  )

  /** Adds CustomTopBarTitle to Mirador plugins */
  const plugins = [
    {
      mode: 'wrap',
      component: CustomTopBarTitle,
      target: 'WindowTopBarTitle'
    }
  ]

  return (
    <>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ itemTitle }</title>
      </Helmet>
      <div className='viewer'>
        <Viewer config={configs} plugins={plugins} />
      </div>
    </>
  )
}

export default PageDigitalObject;
