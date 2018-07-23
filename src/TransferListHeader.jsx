import React, { Component } from 'react';

class TransferListHeader extends Component {
  componentDidUpdate() {
    this.node.indeterminate = this.props.indeterminate;
  }
  render() {
    const {
      itemCount,
      title,
      checked,
      handleCheckAll,
      filteredDataSource,
    } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          ref={n => (this.node = n)}
          checked={checked}
          onChange={() => handleCheckAll(filteredDataSource, checked)}
        />
        <label>
          {itemCount === 1 ? `${itemCount} ${title}` : `${itemCount} ${title}s`}
        </label>
      </div>
    );
  }
}

export default TransferListHeader;
