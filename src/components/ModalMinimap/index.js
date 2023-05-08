import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import MaterialIcon from '../MaterialIcon'
import Minimap from '../Minimap'
import { t, Trans, Select } from '@lingui/macro'
import './styles.scss'

const minimapAboutText = <Trans comment='The about section for minimaps.'>
  <p>Jump to a part of the collection containing matches by clicking on an active square.</p>
  <p>In the minimap diagram, each square represents part of this collection.
  Colored squares represent parts that contain one or more matches for your search.</p>
</Trans>

const minimapIntroText = <Trans comment='The introduction for minimaps.'>
  <p>The minimap is a new feature that allows you to quickly jump to search matches in a
  collection by clicking on an active square.</p>
  <p>In the minimap diagram, each square represents part of this collection.
  Colored squares represent parts that contain one or more matches for your search.</p>
</Trans>

export const ModalMinimapInfo = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal-content--minimap-info'
    overlayClassName='modal-overlay' >
    <div className='modal-header--minimap'>
      <h2 className='modal-header__title--minimap'><Select comment=""
        value={props.hasSeenMinimapIntro}
        _true="Minimap"
        other="Introducing the Minimap" />
      </h2>
      <button className='modal-header__button' aria-label={t({
        comment: 'Aria Label for a button to close modal minimap info.',
        message: 'Close'
      })} onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-body--minimap'>
      {props.hasSeenMinimapIntro ? minimapAboutText : minimapIntroText}
    </div>
  </Modal>
)

ModalMinimapInfo.propTypes = {
  appElement: PropTypes.object,
  hasSeenMinimapIntro: PropTypes.bool.isRequired,
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
      <h2 className='modal-header__title--minimap'>
        <Trans comment='Header for modal minimap'>
          Minimap
        </Trans>
      </h2>
      <button className='modal-header__button' aria-label={t({
        message: 'Close'
      })} onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-body--minimap'>
      {minimapAboutText}
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
