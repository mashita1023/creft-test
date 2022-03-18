import { Component, createRef, RefObject, CSSProperties } from 'react'
import PropTypes from 'prop-types'

const propTypes: Props = {
  height: PropTypes.string.isRequired,
  rows: PropTypes.number,
}

interface Props {
  height: () => { [key: string]: string }
  rows: () => { [key: number]: number }
}

export default class TableScrollbar extends Component<Props> {
  observer: MutationObserver | undefined
  container: HTMLDivElement | null
  table: HTMLTableElement | null
  tableclone: HTMLTableElement | null
  headHeight: number
  rowHeight: number

  static propTypes = {
    height: PropTypes.string.isRequired,
    rows: PropTypes.number,
  }

  constructor(props: any) {
    super(props)

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.renderFixedHeader = this.renderFixedHeader.bind(this)
    //    this.observer = null;
    this.container = null
    this.table = null
    this.tableclone = null
    this.headHeight = 0
    this.rowHeight = 0
  }

  componentDidMount() {
    this.observer = new MutationObserver(this.handleResize)
    this.renderFixedHeader()
    window.addEventListener('resize', this.handleResize)
    this.forceUpdate()
  }

  componentWillUnmount() {
    if (this.observer != undefined) {
      this.observer.disconnect()
      window.removeEventListener('resize', this.handleResize)
    }
  }

  componentDidUpdate() {
    this.renderFixedHeader()
  }

  handleScroll() {
    if (this.tableclone != null && this.container != null) {
      this.tableclone.style.top = this.container.scrollTop + 'px'
    }
  }

  handleResize() {
    // Copy the columns width from the table to the clone.
    if (this.table != null && this.tableclone != null) {
      let columns = this.table.getElementsByTagName('th')
      let cloneColumns = this.tableclone.getElementsByTagName('th')
      for (let i = 0; i < columns.length; i++) {
        let width = columns[i].clientWidth + 'px'
        cloneColumns[i].style.minWidth = width
        cloneColumns[i].style.width = width
        cloneColumns[i].style.boxSizing = 'border-box'
      }
    }
  }

  renderFixedHeader() {
    // Remove previous table clone from the DOM.
    if (
      this.tableclone !== null &&
      this.observer !== undefined &&
      this.container !== null
    ) {
      if (this.tableclone.parentNode !== null) {
        this.tableclone.parentNode.removeChild(this.tableclone)
      }
      this.tableclone = null
      this.table = null
      this.observer.disconnect()

      // Find the enclosed table and clone it, removing the tbody to keep
      // the thead only.
      this.table = this.container.getElementsByTagName('table')[0]
      this.tableclone = this.table
      this.tableclone.removeChild(
        this.tableclone.getElementsByTagName('tbody')[0],
      )

      // Set the clone size (column widths) and position (scroll top)
      this.handleResize()
      this.handleScroll()

      // Observe any further DOM changes
      const config = {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      }
      this.observer.observe(this.table, config)

      // Add the clone to the container.
      this.tableclone.setAttribute(
        'class',
        this.table.getAttribute('class') + ' table-fixed-head',
      )
      this.tableclone.style.position = 'absolute'
      this.container.appendChild(this.tableclone)

      // Get the table head height.
      if (this.headHeight === 0) {
        const thead = this.table.getElementsByTagName('thead')[0]
        if (thead) {
          this.headHeight = thead.clientHeight
          //console.log("Table head height:", this.headHeight);
        }
      }

      // Get the table row height - from a temp row, as the table body
      // may not contain any row yet.
      if (this.rowHeight === 0) {
        const tbody = document.createElement('tbody')
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        const content = document.createTextNode('&nbsp;')
        td.appendChild(content)
        tr.appendChild(td)
        tbody.appendChild(tr)
        this.tableclone.appendChild(tbody)
        this.rowHeight = tbody.clientHeight // Use tbody iso of tr to account for border-spacing.
        this.tableclone.removeChild(tbody)
        //console.log("Table row height:", this.rowHeight);
      }
    }
  }

  render() {
    const { height, rows } = this.props

    const containerStyle: CSSProperties = {
      height: this.props.rows
        ? this.headHeight + this.props.rows * this.rowHeight + 'px'
        : this.props.height,
      overflow: 'auto',
      position: 'relative',
    }

    return (
      <div
        className="TableScrollbar"
        style={containerStyle}
        onScroll={this.handleScroll}
        ref={(container) => {
          if (container != null) {
            this.container = container
          }
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
