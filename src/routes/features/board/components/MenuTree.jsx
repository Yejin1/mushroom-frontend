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

export default function MenuTree({ boardMenuData, onSelectBoard }) {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (boardMenuData && boardMenuData.length > 0) {
      setTreeData(convertToAntdTreeData(boardMenuData));
    }
  }, [boardMenuData]);

  return (
    <Tree
      treeData={treeData}
      defaultExpandAll
      className={styles['board-tree']}
      onSelect={(selectedKeys, info) => {
        if (info.node.type === 'b') {
          onSelectBoard(info.node.key); // 게시판 ID 전달
        }
      }}
    />
  );
}
