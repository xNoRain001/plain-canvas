class Polygon {
  constructor(x, y, r, sides, context) {
    this.x = x
    this.y = y
    this.r = r
    this.sides = sides
    this.context = context
  }

  getPoints() {
    const { x, y, r, sides } = this
    const step = 360 / sides
    const points = []

    for (let i = 0; i < 360; i += step) {
      const angle = i / 180 * Math.PI
      const _x = x + r * Math.sin(angle)
      const _y = y + r * Math.cos(angle)

      points.push({
        x: _x,
        y: _y
      })
    }

    return points
  }

  createPath() {
    const points = this.getPoints()
    const { context } = this
    const { x, y } = points[0]
    
    context.beginPath()
    context.moveTo(x, y)

    for (let i = 1, l = points.length; i < l; i++) {
      const { x, y } = points[i]

      context.lineTo(x, y)
    }

    context.closePath()
  }

  move (x, y) {
    this.x = x
    this.y = y
  }

  fill (fillStyle) {
    const { context } = this
    
    context.save()

    if (fillStyle) {
      context.fillStyle = fillStyle
    }

    context.fill()
    context.restore()
  }

  stroke (strokeStyle, lineWidth) {
    const { context } = this
    
    context.save()

    if (strokeStyle) {
      context.strokeStyle = strokeStyle
    }

    if (lineWidth) {
      context.lineWidth = lineWidth
    }

    context.stroke()
    context.restore()
  }
}

export default Polygon
