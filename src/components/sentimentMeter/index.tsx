import dynamic from "next/dynamic"

const ReactDynamicSpeedometer = dynamic(() => import('react-d3-speedometer'), {
    ssr: false,
  })

export const SentimentMeter = function SentimentMeter({title = 'Agent Sentiment', value = 0.0}) {
    return (
        <ReactDynamicSpeedometer
        value={value}
        currentValueText={title}
        minValue={-1.0}
        maxValue={1.0}
        height={250}
        width={250}
        segments={3}
        ringWidth={30}
        textColor='#f1f1f1'
        customSegmentStops={[-1.0, -0.3, 0.3, 1.0]}
        customSegmentLabels={[
          {
            text: "Negative",
            color: "#fff",
            fontSize: '12px',
          },
          {
            text: "Neutral",
            color: "#fff",
            fontSize: '12px',
          },
          {
            text: "Positive",
            color: "#fff",
            fontSize: '12px',
          },
        ]}
      />
    )
}
  