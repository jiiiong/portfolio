# Definition for a binary tree node.
from typing import Optional, Tuple, List
import collections

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        
        # 前序遍历找到 p
        
        def pre_order(root: Optional[TreeNode]):
            if not root:
                return
            
            nonlocal meet_first
            if not meet_first:
                ancestors.append(root)
                if root == p or root == q:
                    meet_first = True
            elif root == p or root == q:
                nonlocal cloest_ancestor
                cloest_ancestor = ancestors[-1]

            pre_order(root.left)
            pre_order(root.right)
            if ancestors[-1] == root:
                ancestors.pop()

        meet_first = False
        cloest_ancestor = root
        ancestors = []
        return cloest_ancestor

            
            
                
        



        