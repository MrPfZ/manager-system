import * as echarts from 'echarts'
import { useRef, useEffect, useState } from 'react'
export const useCharts = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    const instance = echarts.init(chartRef.current as HTMLElement)
    setInstance(instance)
  })
  return [chartRef, chartInstance]
}
