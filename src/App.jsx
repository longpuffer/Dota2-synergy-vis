import * as d3 from "d3";
import React, { useState, useEffect } from "react";

function App() {
  const [nodesData, setNodesData] = useState([
    {
      id: 0,
      x: 36.525217544878785,
      y: 1.2182019826444623,
      r: 30,
      text: "Node0",
    },
    {
      id: 1,
      x: 580.9377888596799,
      y: 136.54838570454584,
      r: 30,
      text: "Node1",
    },
    {
      id: 2,
      x: 59.23939929825366,
      y: 347.60311002719465,
      r: 30,
      text: "Node2",
    },
    { id: 3, x: 579.404960455471, y: 441.7082456111059, r: 30, text: "Node3" },
    { id: 4, x: 15.97668907608214, y: 501.5224767929481, r: 30, text: "Node4" },
    { id: 5, x: 540.5084760064832, y: 495.2584416123257, r: 30, text: "Node5" },
    {
      id: 6,
      x: 149.98390958868998,
      y: 258.84586649697144,
      r: 30,
      text: "Node6",
    },
  ]);
  const [linksData, setLinksData] = useState([]);
  const width = 600;
  const height = 600;

  useEffect(() => {
    const nodes = new Array(7);
    for (let i = 0; i < 7; i++) {
      nodes[i] = {
        id: i,
        x: width * Math.random(),
        y: height * Math.random(),
        r: 30,
        text: "Node" + i,
      };
    }
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 7; j++) {
        linksData.push({
          source: i,
          target: j,
        });
      }
    }
    setNodesData(nodes.slice());
    const startSimulation = (nodes, links) => {
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "collide",
          d3
            .forceCollide(nodes)
            .radius(function (d) {
              return d.r;
            })
            .strength(0.3)
            .iterations(32)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "x",
          d3
            .forceX()
            .x(width / 2)
            .strength(0.2)
        )
        .force(
          "y",
          d3
            .forceY()
            .y(height / 2)
            .strength(0.2)
        )
        .force(
          "link",
          d3
            .forceLink()
            .id((d) => d.id)
            .iterations(1)
        );
      simulation.nodes(nodes).on("tick", ticked);
      simulation.force("link").links(links);
      function ticked() {
        setNodesData(nodes.slice());
      }
    };
    startSimulation(nodesData, linksData);
  });
  console.log(nodesData[0]);
  return (
    <div>
      <svg width="800" height="800">
        {nodesData.map((data, index) => {
          return (
            <g key={index}>
              <circle cx={data.x} cy={data.y} r={data.r} fill="blue"></circle>
            </g>
          );
        })}
        {linksData.map((data, index) => {
          return (
            <g key={index}>
              <line
                x1={data.source.x}
                x2={data.target.x}
                y1={data.source.y}
                y2={data.target.y}
                stroke="black"
              ></line>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default App;
/*
長さ
斥力
*/
