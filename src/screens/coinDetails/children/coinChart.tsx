import React, { useState } from 'react';
import { View } from 'react-native';
import { RangeSelector } from '.';
import { SimpleChart } from '../../../components';
import { useAppSelector } from '../../../hooks';
import { fetchMarketChart } from '../../../providers/coingecko/coingecko';
import { fetchEngineMarketData } from '../../../providers/hive-engine/hiveEngine';
import getWindowDimensions from '../../../utils/getWindowDimensions';
import styles, { CHART_NEGATIVE_MARGIN } from './children.styles';

interface CoinChartProps {
  coinId: string;
  isEngine?: boolean;
}

export const CoinChart = ({ coinId, isEngine }: CoinChartProps) => {
  const priceHistory = useAppSelector((state) => state.wallet.priceHistories[coinId]);

  const [range, setRange] = useState(isEngine ? 0 : 1);
  const [chartData, setChartData] = useState(priceHistory?.data);

  const _fetchMarketData = async (days: number) => {
    if(isEngine){
      const marketData = await fetchEngineMarketData(coinId, 'usd', days, days > 1 ? 'daily' : 'hourly');
      setChartData(marketData.map((item) => item.close));
    } else {
      const marketData = await fetchMarketChart(coinId, 'usd', days, 'hourly');
      setChartData(marketData.prices.map((item) => item.yValue));
    }

  };

  const _onRangeChange = (range) => {
    setRange(range);
    _fetchMarketData(range);
  };

  const _renderGraph = () => {
    const _baseWidth = getWindowDimensions().width - 32 + CHART_NEGATIVE_MARGIN;
    return (
      <View style={styles.chartContainer}>
        <SimpleChart
          data={chartData || []}
          baseWidth={_baseWidth} // from react-native
          chartHeight={200}
          showLine={true}
          showLabels={true}
        />
      </View>
    );
  };
  return (
    <>
      <View style={styles.card}>{_renderGraph()}</View>
      <RangeSelector range={range} onRangeChange={_onRangeChange} />
    </>
  );
};
