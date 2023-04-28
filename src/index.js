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

  circle (
    x, y, r, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false
  ) {
    const { context } = this

    context.beginPath()
    context.arc(x, y, r, startAngle, endAngle, counterclockwise)
    this.stroke()

    return this
  }

  rect (x, y, width, height) {
    const { context } = this

    context.beginPath()
    context.rect(x, y, width, height)
    this.stroke()

    return this
  }

  polygon (x, y, r, sides) {
    const { context } = this
    const polygon = new Polygon(x, y, r, sides, context)

    polygon.createPath()
    this.stroke()

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

  stroke (color, lineWidth) {
    const { context } = this

    context.save()

    if (color) {
      context.strokeStyle = color
    }

    if (lineWidth) {
      context.lineWidth = lineWidth
    }

    context.stroke()
    context.restore()

    return this
  }

  fill (bgColor) {
    const { context } = this

    context.save()

    if (bgColor) {
      context.fillStyle = bgColor
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
