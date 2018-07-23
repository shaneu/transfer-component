import React, { Component } from 'react';
import TransferListHeader from './TransferListHeader';

class TransferList extends Component {
  handleSelect = item => {
    const { checkedKeys } = this.props;
    const isChecked = checkedKeys.some(key => key === item.key);
    this.props.handleSelect(item, !isChecked);
  };

  getCheckedStatus = filteredDataSource => {
    const { checkedKeys } = this.props;

    if (!checkedKeys.length) {
      return 'none';
    } else if (
      filteredDataSource.every(item => checkedKeys.includes(item.key))
    ) {
      return 'all';
    }
    return 'part';
  };

  render() {
    const { title, items, onSelect, handleSelectAll, checkedKeys } = this.props;
    const filteredDataSource = items.filter(item => !item.disabled);
    const checkedStatus = this.getCheckedStatus(filteredDataSource);
    console.log('checkedstatus', checkedStatus);
    return (
      <div className="transfer__list">
        <TransferListHeader
          itemCount={items.length}
          title={title}
          handleCheckAll={handleSelectAll}
          filteredDataSource={filteredDataSource}
          checked={checkedStatus === 'all'}
          indeterminate={checkedStatus === 'part'}
        />
        <ul className="transfer__list-ul">
          {items.map(elem => (
            <li key={elem.key} className="transfer__list-list-item">
              <input
                type="checkbox"
                onChange={() => this.handleSelect(elem)}
                disabled={elem.disabled}
                name={elem.title}
                checked={checkedKeys.includes(elem.key)}
              />
              <label htmlFor={elem.title}>{elem.title}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TransferList;
