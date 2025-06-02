"use client";

import type React from "react";
import Tree from "react-d3-tree";
import { motion } from "framer-motion";
import styles from "./RecursiveTreeVisualization.module.css";

interface TreeNode {
  name: string;
  attributes?: { [key: string]: string | number };
  children?: TreeNode[];
}

interface RecursiveTreeVisualizationProps {
  data: TreeNode;
}

const RecursiveTreeVisualization: React.FC<RecursiveTreeVisualizationProps> = ({
  data,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 400 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", height: "400px" }}
    >
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 200, y: 20 }}
        nodeSize={{ x: 200, y: 50 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        rootNodeClassName={styles.node__root}
        branchNodeClassName={styles.node__branch}
        leafNodeClassName={styles.node__leaf}
      />
    </motion.div>
  );
};

export default RecursiveTreeVisualization;
