import Polygon from './polygon'

class Canvas {
  constructor (canvas, options = {}) {
    const context = canvas.getContext('2d')
    const { lineWidth, fillStyle, strokeStyle } = options

    context.lineWidth = lineWidth || 1
    context.fillStyle = fillStyle || '#fff'
    context.strokeStyle = strokeStyle || '#000'

    this.canvas = canvas
    this.context = context
  }

  line (x1, y1, x2, y2, strokeOptions) {
    const { context } = this

    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    this.stroke(strokeOptions)

    return this
  }

  arc (
    x, y, r, startAngle, endAngle, counterclockwise, strokeOptions
  ) {
    const { context } = this

    context.beginPath()
    context.arc(x, y, r, startAngle, endAngle, counterclockwise)
    this.stroke(strokeOptions)

    return this
  }

  circle (x, y, r, strokeOptions) {
    const { context } = this

    context.beginPath()
    context.arc(x, y, r, 0, Math.PI * 2)
    this.stroke(strokeOptions)

    return this
  }

  rect (x, y, width, height, strokeOptions) {
    const { context } = this

    context.beginPath()
    context.rect(x, y, width, height)
    this.stroke(strokeOptions)

    return this
  }

  polygon (x, y, r, sides) {
    const { context } = this
    const polygon = new Polygon(x, y, r, sides, context)

    polygon.createPath()
    polygon.stroke()

    return polygon
  }

  grid (
    stepX = 10, stepY = 10, lineWidth = 0.5, color, bgColor
  ) {
    const { canvas, context } = this
    const { width, height } = canvas

    this.rect(0, 0, width, height).fill(bgColor)

    context.beginPath()

    // horizontal line
    for (let i = stepY + lineWidth; i < height; i += stepY) {
      context.moveTo(0, i)
      context.lineTo(width, i)
    }

    // vertical line
    for (let i = stepX + lineWidth; i < width; i += stepX) {
      context.moveTo(i, 0)
      context.lineTo(i, height)
    }

    this.stroke(color, lineWidth)

    context.restore()
  }

  stroke (strokeOptions = {}) {
    const { context } = this
    const { lineWidth, strokeStyle } = strokeOptions

    context.save()

    if (strokeStyle) {
      context.strokeStyle = strokeStyle
    }

    if (lineWidth) {
      context.lineWidth = lineWidth
    }

    context.stroke()
    context.restore()

    return this
  }

  fill (fillStyle) {
    const { context } = this

    context.save()

    if (fillStyle) {
      context.fillStyle = fillStyle
    }

    context.fill()
    context.restore()

    return this
  }

  windowToCanvas (x, y) {
    const { top, left } = this.canvas.getBoundingClientRect()

    return {
      x: x - left,
      y: y - top
    }
  }
}

export default Canvas
