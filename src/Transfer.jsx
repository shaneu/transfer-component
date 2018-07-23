import React, { Component } from 'react';
import TransferList from './TransferList';
import Operations from './Operations';
import TransferListHeader from './TransferListHeader';

class Transfer extends Component {
  state = {
    targetKeys: [],
    sourceSelectedKeys: [],
    targetSelectedKeys: [],
  };

  separateDataSource = () => {
    const { dataSource } = this.props;
    const { targetKeys = [] } = this.state;
    const leftDataSource = [];
    const rightDataSource = new Array(targetKeys.length);

    dataSource.forEach(record => {
      const indexOfKey = targetKeys.indexOf(record.key);

      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record;
      } else {
        leftDataSource.push(record);
      }
    });

    this.separatedDataSource = { leftDataSource, rightDataSource };
    return this.separatedDataSource;
  };

  handleSelectChange = (direction, holder) => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;

    direction === 'left'
      ? this.setState({
          sourceSelectedKeys: [...holder, ...targetSelectedKeys],
        })
      : this.setState({
          targetSelectedKeys: [...sourceSelectedKeys, ...holder],
        });
  };

  handleLeftSelect = (selectedItem, checked) => {
    this.handleSelect('left', selectedItem, checked);
  };

  handleRightSelect = (selectedItem, checked) => {
    this.handleSelect('right', selectedItem, checked);
  };

  handleSelect = (direction, selectedItem, checked) => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    let holder = direction === 'left' ? sourceSelectedKeys : targetSelectedKeys;
    const index = holder.indexOf(selectedItem.key);
    if (index > -1) {
      holder = [...holder.slice(0, index), ...holder.slice(index + 1)];
    }

    if (checked) {
      holder = [...holder, selectedItem.key];
    }

    this.handleSelectChange(direction, holder);
    this.setState({
      [this.getSelectedKeyName(direction)]: holder,
    });
  };

  handleLeftSelectAll = (filteredDataSource, checkAll) => {
    this.handleSelectAll('left', filteredDataSource, checkAll);
  };

  handleRightSelectAll = (filteredDataSource, checkAll) => {
    this.handleSelectAll('right', filteredDataSource, checkAll);
  };

  handleSelectAll = (direction, filteredDataSource, checkAll) => {
    const originalSelectedKeys =
      this.state[this.getSelectedKeyName(direction)] || [];
    const currentKeys = filteredDataSource.map(item => item.key);
    const newKeys1 = originalSelectedKeys.filter(
      key => !currentKeys.includes(key),
    );
    const newKeys2 = [...originalSelectedKeys];
    currentKeys.forEach(key => {
      if (!newKeys2.includes(key)) {
        newKeys2.push(key);
      }
    });
    const holder = checkAll ? newKeys1 : newKeys2;
    this.handleSelectChange(direction, holder);

    this.setState({
      [this.getSelectedKeyName(direction)]: holder,
    });
  };

  getSelectedKeyName = direction =>
    direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';

  moveToRight = () => this.moveTo('right');
  moveToLeft = () => this.moveTo('left');

  moveTo = direction => {
    const { dataSource = [] } = this.props;

    const {
      targetKeys = [],
      sourceSelectedKeys,
      targetSelectedKeys,
    } = this.state;
    const moveKeys =
      direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    const newMoveKeys = moveKeys.filter(
      key => !dataSource.some(data => !!(key === data.key && data.disabled)),
    );

    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => !newMoveKeys.includes(targetKey));

    const oppositeDirection = direction === 'right' ? 'left' : 'right';

    this.setState({
      [this.getSelectedKeyName(oppositeDirection)]: [],
    });

    this.handleSelectChange(oppositeDirection, []);

    this.setState({
      targetKeys: [...newTargetKeys],
      targetSelectedKeys:
        direction === 'left' ? [] : [...this.state.targetSelectedKeys],
      sourceSelectedKeys: this.state.sourceSelectedKeys.filter(
        key => !newTargetKeys.includes(key),
      ),
    });
  };

  render() {
    const { title } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const { leftDataSource, rightDataSource } = this.separateDataSource();
    const leftActive = targetSelectedKeys.length;
    const rightActive = sourceSelectedKeys.length;
    return (
      <div className="transfer">
        <TransferList
          checkedKeys={sourceSelectedKeys}
          items={leftDataSource}
          handleSelect={this.handleLeftSelect}
          handleSelectAll={this.handleLeftSelectAll}
          title={title}
        />
        <Operations
          moveToLeft={this.moveToLeft}
          moveToRight={this.moveToRight}
          rightActive={rightActive}
          leftActive={leftActive}
        />
        <TransferList
          checkedKeys={targetSelectedKeys}
          items={rightDataSource}
          handleSelect={this.handleRightSelect}
          handleSelectAll={this.handleRightSelectAll}
          title={title}
        />
      </div>
    );
  }
}

export default Transfer;
