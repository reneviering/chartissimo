import React, { FunctionComponent, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import styles from './Chart.module.css';

type Props = {
  width: number;
  height: number;
  data: any[];
};

const Chart: FunctionComponent<Props> = ({ width, height, data }) => {
  const d3Container = useRef(null);
  const margin = 60;

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

      // the coordinate system starts from top to bottom and we want to have
      // the largest number at the top so first parameter is height, second 0 in range
      const yScale = d3
        .scaleLinear()
        .range([height - 2 * margin, 0])
        .domain([0, 100]);
      chart.append('g').call(d3.axisLeft(yScale));

      const xScale = d3
        .scaleBand()
        .range([0, width - 2 * margin])
        .domain(data.map(item => item.language))
        .padding(0.3);
      chart
        .append('g')
        .attr('transform', `translate(0, ${height - 2 * margin})`)
        .call(d3.axisBottom(xScale));

      chart
        .selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('x', dataItem => xScale(dataItem.language) || '')
        .attr('y', dataItem => yScale(dataItem.value))
        .attr('height', s => height - 2 * margin - yScale(s.value))
        .attr('width', xScale.bandwidth());
    }
  }, [d3Container.current]);

  return (
    <svg
      className={styles.component}
      width={width}
      height={height}
      ref={d3Container}
    />
  );
};

export { Chart };
