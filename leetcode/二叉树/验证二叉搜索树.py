# Definition for a binary tree node.
from typing import Optional, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:

        def dfs(root: TreeNode) -> Tuple[bool, int, int]:
            
            # 存在左右子树
            if (root.left and root.right):
                left_f, left_max, left_min = dfs(root.left)
                right_f, right_max, right_min = dfs(root.right)
                if (left_f and right_f and left_max < root.val < right_min):
                    return (True, left_min, right_max)
                else:
                    return (False, 0, 0)
            elif (root.left):
                left_f, left_max, left_min = dfs(root.left)
                if (left_f and left_max < root.val):
                    return (True, left_min, root.val)
                else:
                    return (False, 0, 0)
            elif (root.right):
                right_f, right_max, right_min = dfs(root.right) 
                if (right_f and  root.val < right_min):
                    return (True, root.val, right_max)
                else:
                    return (False, 0, 0)
            else:
                return (True, root.val, root.val)
            
        if not root:
            return False
           
        return dfs(root)[0]
    
array = [5,1,4,None,None,3,6]

