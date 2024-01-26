import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard  React components
import MDBox from "components/MDBox";

// HorizontalBarChart configurations
import configs from "appcomponents/Charts/BarCharts/HorizontalStackBarChart/configs";

// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import { Grid } from "@mui/material";

function HorizontalStackBarChart({ icon, title, description, height, width, chart ,chartId}) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 10,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);
  const htmlLegendPlugin1 = {
    id: "htmlLegend",
    afterUpdate(chart) {
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
      const ul = document.createElement("ul");
      ul.style.display = 'flex';
      ul.style.flexDirection = 'row';
      ul.style.margin = 0;
      ul.style.padding = 0;
      ul.style.width="max-content"
     items.forEach(item => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '12px';
      boxSpan.style.marginRight = '6px';
      boxSpan.style.width = '12px';
      boxSpan.style.borderRadius = '4px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
      });
      const jsLegend = document.getElementById(chartId);
      // Remove old legend items
      while (jsLegend?.firstChild) {
        jsLegend.firstChild.remove();
      }
      jsLegend?.appendChild(ul);
    }
  }
  const renderChart = (
    <MDBox pt={1.1} height={height} width="inherit">
      {useMemo(
        () => (
          <>
          <Bar data={data} options={options} plugins={[htmlLegendPlugin1]} />
         </>
        ),
        [chart, height]
      )}
      {/* <Grid id={chartId} sx={{mt:"-25px",maxWidth:"100%",fontSize:"14px",overflowX:"scroll", ml: "-8px" }} ></Grid> */}
      <Grid id={chartId} sx={{mt:"-25px",fontSize:"14px",overflowX:"scroll", ml: "-8px" }} ></Grid>
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of HorizontalBarChart
HorizontalStackBarChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the HorizontalBarChart
HorizontalStackBarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "color1"
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default HorizontalStackBarChart;
