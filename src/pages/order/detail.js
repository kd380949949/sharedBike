import React from 'react'
import {Card} from 'antd'
import axios from '../../Axios'
import './detail.less'

export default class OrderDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orderInfo:'',//详情信息
        }
    }
    componentDidMount(){ //取得url上的orderid并进行请求getDetailInfo
        let orderId = this.props.match.params.orderId;
        // console.log(orderId)
        if(orderId){
            this.getDetailInfo(orderId);
        }
    }
    getDetailInfo=(orderId)=>{
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId: orderId
                }
            }
        }).then((res)=>{
            if(res.code==0){  //用全等 会报错
                // console.log(res.result)
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }
        })
    }
    /*
        地图相关
    */
   renderMap=(result)=>{  //渲染地图
        this.map= new window.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京',11);//设置地图中心点，地图初始化，同时设置地图展示级别
        //添加地图控件
        this.addMapControl();
        //路线绘制
        this.drawBikeRoute(result.position_list);
        //绘制服务区
        this.drawServiceArea(result.area)
   }
   addMapControl=()=>{  //添加地图控件
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })); 
    }
    drawBikeRoute = (positionList)=>{ //绘制用户行驶路线
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length>0){  //向地图添加标注，定义标注图标
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon,first.lat);
            //定义标注图标
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(18, 42)
            })
            //// 创建start标注对象并添加到地图 
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);
                // 创建end标注对象并添加到地图 
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)//调整icon偏移位置
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);
            //连接路线
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){ //将坐标点变成地图上的点
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }
            //连接成折线
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }
    }
    drawServiceArea = (positionList)=>{ //绘制服务区
            //获取坐标并变为地图上点
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        //绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:'#CE0000',
            strokeWeight:4,
            strokeOpacity:1,
            //新添加配置项
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon)
    }

    render(){
        const info = this.state.orderInfo || {};
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}