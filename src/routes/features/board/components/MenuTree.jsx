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

function MenuTreeNode({ node, onSelectBoard }) {
  return (
    <li className={styles.treeNode}>
      <span
        className={node.type === 'b' ? styles.boardNode : styles.folderNode}
        onClick={() => node.type === 'b' && onSelectBoard(node.id)}
        style={{ cursor: node.type === 'b' ? 'pointer' : 'default' }}
      >
        {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <ul className={styles.treeChildren}>
          {node.children.map(child => (
            <MenuTreeNode key={child.id} node={child} onSelectBoard={onSelectBoard} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MenuTree({ boardMenuData = [], onSelectBoard }) {
  return (
    <ul className={styles.treeRoot}>
      {boardMenuData.map(node => (
        <MenuTreeNode key={node.id} node={node} onSelectBoard={onSelectBoard} />
      ))}
    </ul>
  );
}
