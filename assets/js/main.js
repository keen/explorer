Keen.ready(function() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Dogs');
  data.addColumn('number', 'Cats');

  var dataSet = [
    [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
    [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
    [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
    [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
    [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
    [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
    [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
    [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
    [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
    [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
    [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
    [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
  ];

  data.addRows(dataSet);

  var options = {
    hAxis: {
      gridlines: {
        color: 'transparent'
      },
      baselineColor: 'transparent',
      textStyle: {
        color: 'transparent'
      }
    },
    vAxis: {
      gridlines: {
        color: 'transparent'
      },
      baselineColor:'transparent',
      textStyle: {
        color: 'transparent'
      }
    },
    series: {
      0: {
        curveType:'function',
        color: '#15B4D6'
      },
      1: {
        curveType: 'function',
        color: '#00C8ED'
      }
    },
    backgroundColor: 'transparent',
    legend: {
      position: 'none'
    },
    theme: 'maximized',
    animation: {
      duration: 200,
      easing: 'in'
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementsByClassName('masthead-chart')[0]);
  chart.draw(data, options);

  var STEP_RANGE = 15;
  var TREND_DELTA = 6;

  setInterval(function() {
    var lastSet = dataSet[dataSet.length - 1];
    var diffOne = Math.ceil(Math.random() * STEP_RANGE) - TREND_DELTA;
    var diffTwo = Math.ceil(Math.random() * STEP_RANGE) - TREND_DELTA;

    // Create new row - [x, y1, y2]
    var newData = [lastSet[0] + 1, lastSet[1] + diffOne, lastSet[2] + diffTwo];

    dataSet.shift();
    dataSet.push(newData);

    data.removeRow(0);
    data.addRow(newData);

    chart.draw(data, options);

  }, 1000);
});