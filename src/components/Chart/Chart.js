// import "./Chart.css";
import ChartBar from "./ChartBar";
//* CSS Modules
import styles from './Chart.module.css'

function Chart(props) {
  const arrOfValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const overallMaxValue = Math.max(...arrOfValues);
  return (
    <div className={styles.chart}>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label} // Since label is unique to every chart bar
          value={dataPoint.value}
          label={dataPoint.label}
          maxValue={overallMaxValue}
        ></ChartBar>
      ))}
    </div>
  );
}

export default Chart;
