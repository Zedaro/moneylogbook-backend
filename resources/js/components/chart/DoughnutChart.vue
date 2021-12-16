<template>
  <div>
    <div class="chart-box">
      <canvas id="doughnut-chart" ref="doughnutChart"></canvas>
    </div>
  </div>
</template>

<script>
//import Chart from 'chart.js/auto';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DoughnutLabel from 'chartjs-plugin-doughnutlabel';


let initialChart = null;
let configObject = null;
let context = null

export default {
  name: 'DoughnutChart',
  data() {
    return {
      //chart: null
    };
  },
  mounted() {

    /*
    Chart.register({
      id: 'doughnutCentralText',
      // eslint-disable-next-line no-unused-vars
      beforeDraw: function(chart, args, options) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.ctx;

          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 20;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var i = 0; i < words.length; i++) {
            var testLine = line + words[i] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && i > 0) {
              lines.push(line);
              line = words[i] + ' ';
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    });
    */


    Chart.Legend.prototype.afterFit = function() {
      this.height = this.height + 25;
    };

    //setup / data block
    const totalMoney = this.$store.getters.getTotalMoney;
    const formattedTotalMoney = this.$t('moneyFormat.format').format(totalMoney);
    const data = {
      labels: [],
      datasets: [{
        //label: 'My First Dataset',
        data: [],
        backgroundColor: [],
        datalabels: {
          labels: {
            percentage: {
              align: 'top',
              formatter: function(value) {
                return ( (value/totalMoney) * 100 ).toFixed(2).replace(/\./g, ',') + '%';
              }
            },
            money: {
              align: 'bottom',
              formatter: function(value) {
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
              }
            },
          },
          color: 'black'
        },
        hoverOffset: 4
      }]
    }

    //Hol dir die Konten in eine Variable
    const moneyAccounts = this.$store.getters.getMoneyAccounts;
    //Befülle doughnutChartData mit Vue-Daten: Name, Betrag und Farbe der Konten
    moneyAccounts.forEach( account => {
      data.labels.push(account.name);
      data.datasets[0].data.push(account.money);
      data.datasets[0].backgroundColor.push(account.color);
    });
    //


    //config block
    let config = {
      type: 'doughnut',
      data: data,
      plugins: [ChartDataLabels, DoughnutLabel],
      options: {
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: this.totalText,
                font: {
                  size: '50'
                }
              },
              {
                text: formattedTotalMoney,
                font: {
                  size: '25'
                }
              }
            ]
          }
        },
        maintainAspectRatio: false,
        /*
        elements: {
          center: {
            text: 'Text' , // + formattedTotalMoney,
            color: '#000000', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: false, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25 // Default is 25 (in px), used for when text wraps
          }
        }
        */
      }
    }
    //


    //init / render block
    const ctx = document.getElementById('doughnut-chart');
    //initialChart =
    initialChart = new Chart(ctx, config);
    //

    //dataObject = data;
    configObject = config;
    context = ctx;

  },
  computed: {
    totalText() {
      return this.$t('totalText');
    },
    locale() {
      return this.$i18n.locale;
    }
  },
  watch: {
    locale() {
      //console.log(this.$refs.doughnutChart);  //.config.options.plugins.doughnutlabel.text = this.totalText;

      //destroy initial chart
      initialChart.destroy();

      //update inner text of chart in the config object
      configObject.options.plugins.doughnutlabel.labels[0].text = this.$t('totalText');
      configObject.options.plugins.doughnutlabel.labels[1].text = this.$t('moneyFormat.format').format(this.$store.getters.getTotalMoney);

      //create new chart
      new Chart(context, configObject);

      /*
      configObject.options.plugins.doughnutlabel.text = this.$t('totalText');

      let chart = new Chart(context, configObject);
      console.log(chart.options.plugins.doughnutlabel.text);
      chart.update();
      */


      /*
      console.log(this.chart);
      this.chart.options.plugins.doughnutlabel.labels[0].text = this.totalText;
      this.chart.update();
      console.log(this.chart);
      */
    }
  },
}
</script>

<style scoped>

  .chart-box {
    position: relative;
    height: 80vh;
    margin: auto auto 150px auto;
  }

</style>