"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import mapData from "../public/json/mapdata.json";

const json: any = mapData;

const Map: React.FC = () => {
  // 使用 useRef 创建一个 ref 来引用地图容器的 DOM 元素
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初始化 ECharts 实例，绑定到 chartRef 引用的 DOM 元素
    const chart = echarts.init(chartRef.current!);

    // 注册地图数据
    echarts.registerMap("china", json);

    // 配置 ECharts 的选项
    const option = {
      // 配置 tooltip，用于在鼠标悬停时显示信息
      tooltip: {
        trigger: "item", // 触发类型，设置为 'item'，即鼠标悬停在地图区域时触发
        formatter: "{b}", // 显示内容，这里设置为显示区域名称（省份名）
        backgroundColor: "rgba(50, 50, 50, 0.7)", // tooltip 背景颜色
        borderColor: "#333", // tooltip 边框颜色
        borderWidth: 1, // tooltip 边框宽度
        textStyle: {
          color: "#FFF", // tooltip 中文本的颜色
          fontSize: 14, // tooltip 中文本的字体大小
        },
      },
      // 配置 series 数据项
      series: [
        {
          name: "map",
          type: "map",
          map: "china",
          roam: true, // 地图的平移和缩放功能
          zoom: 1.2, // 初始缩放比例
          scaleLimit: {
            min: 1, // 最小缩放比例
            max: 5, // 最大缩放比例
          },
          label: {
            show: false, // 是否显示地区名称
          },
          data: [], // 区域数据
        },
      ],
    };

    // 将配置应用到 ECharts 实例
    chart.setOption(option);

    // 在组件卸载时销毁 ECharts 实例，避免内存泄漏
    return () => {
      chart.dispose();
    };
  }, []); // 该 effect 只在组件挂载和卸载时运行

  // 返回一个全屏的 div，用于渲染 ECharts 地图
  return <div ref={chartRef} className="w-full h-screen" />;
};

export default Map;
