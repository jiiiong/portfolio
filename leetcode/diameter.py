# Definition for a binary tree node.
from typing import Optional, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        def helper(root: TreeNode) -> TreeNode:

            if not root.right:
                if root.left:
                    helper(root.left)
                    root.right = root.left
                return root
            elif not root.left:
                return helper(root.right)
            else:
                left_last = helper(root.left)
                right_last = helper(root.right)
                left_last.right = root.right
                root.right = root.left
                return right_last
        if not root:
            return 
        helper(root)