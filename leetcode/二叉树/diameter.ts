
// Definition for a binary tree node.
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


function diameterOfBinaryTree(root: TreeNode | null): number {

    interface feature {
        diameter: number;
        maxDepth: number;
    }

    function recursive(root: TreeNode | null): feature {
        // return [diameter, maxDepth]
        if (!root) {
            return {diameter: 0 ,maxDepth: 0};
        }
        
        const left = recursive(root.left);
        const right = recursive(root.right);
        const curMaxDepth = Math.max(left.maxDepth, right.maxDepth);
        const dia1 = left.maxDepth + right.maxDepth;
        return {diameter: Math.max(left.diameter, right.diameter,dia1), maxDepth: curMaxDepth};
    }

    return recursive(root).diameter;

};

