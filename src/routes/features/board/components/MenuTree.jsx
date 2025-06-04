import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import styles from './MenuTree.module.css';


function convertToAntdTreeData(boardMenuList) {
  return boardMenuList.map(menu => ({
    title: menu.name,
    key: String(menu.id),
    type: menu.type, // 'f' or 'b' 정보 유지
    children: menu.children ? convertToAntdTreeData(menu.children) : [],
  }));
}

// 모든 노드의 key를 재귀적으로 수집
function getAllKeys(data) {
  let keys = [];
  data.forEach(node => {
    keys.push(node.key);
    if (node.children && node.children.length > 0) {
      keys = keys.concat(getAllKeys(node.children));
    }
  });
  return keys;
}

export default function MenuTree({ boardMenuData, onSelectBoard }) {
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    if (boardMenuData && boardMenuData.length > 0) {
      const converted = convertToAntdTreeData(boardMenuData);
      setTreeData(converted);
      setExpandedKeys(getAllKeys(converted)); // 모든 노드 펼침
    }
  }, [boardMenuData]);

  return (
    <Tree
      treeData={treeData}
      expandedKeys={expandedKeys}
      onExpand={setExpandedKeys}
      className={styles['board-tree']}
      onSelect={(selectedKeys, info) => {
        if (info.node.type === 'b') {
          onSelectBoard(info.node.key);
        }
      }}
    />
  );
}
