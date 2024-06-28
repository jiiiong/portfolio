# Definition for a binary tree node.
from typing import Optional, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        
        def recursive(root: Optional[TreeNode]) -> Tuple[int, int]:
            if not root:
                return (0, 0)
            left_d, left_max_depth = recursive(root.left)
            right_d, right_max_depth = recursive(root.right)

            max_depth = max(left_max_depth, right_max_depth) + 1

            # 如果经过 root，则 diameter 必然是 d1；
            # 否则，只可能是 d2 和 d3 
            d1 = left_max_depth + right_max_depth
            d2 = left_d
            d3 = right_d
            diameter = max(d1, d2, d3)
            return (diameter, max_depth)
        
        return recursive(root)[0]