class MakeTree {
  constructor(v, l, r) {
    this.v = v;
    this.l = l;
    this.r = r;
  }
}

function f(root, k) {
const seen = new Set();
const result = []
function inner(node) {
  if (!node) return;
  const diff = k - node.v;
  if (seen.has(diff)) {
    result.push([diff, node.v])
  }
  seen.add(node.v);
  inner(node.l);
  inner(node.r)
}
inner(root);
return result
}

const root = new MakeTree(1,
  new MakeTree(2,
    new MakeTree(3),
    new MakeTree(1)
  ),
  new MakeTree(3,
    new MakeTree(1),
    new MakeTree(2)
  )
);

let a = f(root, 4)
console.log(a)