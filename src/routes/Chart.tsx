import { useQuery } from 'react-query';
import {fetchCoinHistory} from '../api'
import ApexChart from 'react-apexcharts';

interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps{
    coinId:string
}

function Chart({coinId} : ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    console.log(data);
    
    
    return (
        <h1>
            {isLoading ? 
                (
                    "Loading chart..."
                ) : (
                    <ApexChart 
                        type="line" 
                        series={[
                            {
                                name:"price",
                                data:data?.map(price => price.close)
                            }
                        ]}
                        options={{
                            theme:{
                                mode:"dark",
                            },
                            chart:{
                                height: 300,
                                width: 500,
                                toolbar:{
                                    show:false,
                                },
                                background: "transparent",
                            },
                            grid: {
                                show:false,
                            },
                            yaxis:{
                                show:false,
                            },
                            xaxis:{
                                axisBorder:{
                                    show:false,
                                },
                                axisTicks:{
                                    show:false,
                                },
                                labels:{
                                    show:false,
                                },
                            },
                            stroke: {
                                curve:"smooth",
                                width: 5,
                            },
                        }}
                    />
                )
            }
        </h1>
    )
}

export default Chart;