<script setup lang="ts">
const properties = defineProps<{ direction: number }>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  if (!canvas.value) return
  const context = canvas.value.getContext('2d')!
  const cx = 60,
    cy = 60

    // Rings
  ;[48, 34, 18].forEach((r) => {
    context.beginPath()
    context.arc(cx, cy, r, 0, Math.PI * 2)
    context.strokeStyle = 'rgba(88,166,255,0.3)'
    context.lineWidth = 1
    context.stroke()
  })

  // Cardinal labels
  ;['N', 'E', 'S', 'W'].forEach((d, i) => {
    const a = (i * Math.PI) / 2 - Math.PI / 2
    context.fillStyle = 'rgba(88,166,255,0.6)'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(d, cx + 54 * Math.cos(a), cy + 54 * Math.sin(a))
  })

  // Tick marks
  for (let i = 0; i < 36; i++) {
    const a = (i * 10 * Math.PI) / 180 - Math.PI / 2
    const len = i % 9 === 0 ? 10 : i % 3 === 0 ? 6 : 3
    context.beginPath()
    context.moveTo(cx + 48 * Math.cos(a), cy + 48 * Math.sin(a))
    context.lineTo(cx + (48 - len) * Math.cos(a), cy + (48 - len) * Math.sin(a))
    context.strokeStyle = 'rgba(88,166,255,0.4)'
    context.lineWidth = 1
    context.stroke()
  }

  // Center dot
  context.beginPath()
  context.arc(cx, cy, 4, 0, Math.PI * 2)
  context.fillStyle = 'rgba(88,166,255,0.5)'
  context.fill()
  context.beginPath()
  context.arc(cx, cy, 2, 0, Math.PI * 2)
  context.fillStyle = '#58A6FF'
  context.fill()

  const windAngle = ((properties.direction + 180) * Math.PI) / 180 - Math.PI / 2

  const tipX = cx + 35 * Math.cos(windAngle)
  const tipY = cy + 35 * Math.sin(windAngle)
  const tailX = cx - 35 * Math.cos(windAngle)
  const tailY = cy - 35 * Math.sin(windAngle)

  // Wind Arrow Line —
  context.beginPath()
  context.moveTo(tailX, tailY)
  context.lineTo(tipX, tipY)
  context.strokeStyle = '#58A6FF'
  context.lineWidth = 2
  context.lineCap = 'round'
  context.stroke()

  // Wind Arrow Tip >
  const arrowLen = 10
  const arrowAngle = 0.4
  context.beginPath()
  context.moveTo(tipX, tipY)
  context.lineTo(
    tipX - arrowLen * Math.cos(windAngle - arrowAngle),
    tipY - arrowLen * Math.sin(windAngle - arrowAngle),
  )
  context.moveTo(tipX, tipY)
  context.lineTo(
    tipX - arrowLen * Math.cos(windAngle + arrowAngle),
    tipY - arrowLen * Math.sin(windAngle + arrowAngle),
  )
  context.strokeStyle = '#58A6FF'
  context.lineWidth = 2
  context.lineCap = 'round'
  context.stroke()
})
</script>

<template>
  <canvas ref="canvas" width="120" height="120" class="compass-rose" />
</template>

<style scoped></style>
