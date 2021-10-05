import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import MaterialIcon from '../MaterialIcon'
import Minimap from '../Minimap'
import './styles.scss'

const minimapAboutText = 'Jump to an area with hits by clicking on an active square'

export const ModalMinimapInfo = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal-content--minimap-info'
    overlayClassName='modal-overlay' >
    <div className='modal-header--minimap'>
      <h2 className='modal-header__title--minimap'>Minimap</h2>
      <button className='modal-header__button' aria-label='Close' onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-body--minimap'>
      <p>{minimapAboutText}</p>
    </div>
  </Modal>
)

ModalMinimapInfo.propTypes = {
  appElement: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export const ModalMinimap = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal-content--minimap'
    overlayClassName={{
      base: 'modal-overlay slide--left',
      afterOpen: 'slide--left--after-open',
      beforeClose: 'slide--left--before-close'
    }} >
    <div className='modal-header--minimap'>
      <h2 className='modal-header__title--minimap'>Minimap</h2>
      <button className='modal-header__button' aria-label='Close' onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-body--minimap'>
      <p>{minimapAboutText}</p>
      <div className='minimap__wrapper--modal'>
        <Minimap
          data={props.data}
          isLoading={props.isLoading}
          params={props.params}
          rowCount={8}
        />
      </div>
    </div>
  </Modal>
)

ModalMinimap.propTypes = {
  appElement: PropTypes.object,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object,
  rowCount: PropTypes.number,
  toggleModal: PropTypes.func.isRequired
}
