## Overview

Canvas library.

## Installation

```
npm install plain-canvas
```

## Usage

```js
// CommonJS
const Canvas = require('plain-canvas')
```

```js
// ESModule
import Canvas from 'plain-canvas'
```

```html
<!-- Script -->
<script src="../dist/plain-canvas.min.js"></script>
```

```js
const canvas = new Canvas(document.querySelector('#canvas'))

// stroke rect
canvas.rect(100, 100, 50, 50)
// fill rect
canvas.rect(100, 100, 50, 50).fill('red')
```

## License

MIT
