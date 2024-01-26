function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      
      layout: {
        padding: {
          left: 0,
        }
      },
      plugins: { 
        legend: {
          display: false,
          position:"bottom" ,
          align: "start",
          containerID: 'legend-container',

          labels: {
            boxWidth: 12,
            boxHeight: 12, 
            usePointStyle : true,
            pointStyle: 'rectRounded',
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              lineHeight : "12px",
            }
          },
        },
      },
      scales: {
        y: {
          display: false,
          stacked: true, 
        },
        x: {
          display: false,          
          stacked: true,
        },
      },
    },
  };
}

export default configs;
