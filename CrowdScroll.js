import React,{Component} from 'react'
import {View, Text, Image, Dimensions, TouchableWithoutFeedback, Animated} from "react-native";
const ImageData='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528437450780&di=efefa8e02727737abc77f61ba6fd20a9&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0df431adcbef7609c64a714b24dda3cc7dd99ea5.jpg'
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
export default class CrowdScroll extends Component{
    constructor (props){
        super(props)
        this.state={
            scrollY:new Animated.Value(0),
            isSelect:0
        }
    }
        render(){
            return(
                <View style={{backgroundColor:'white',flex:1}}>
                    {this.renderHeader()}
                    <Animated.ScrollView
                        scrollEventThrottle={16}
                        // bounces={false}
                        stickyHeaderIndices={[1]}
                        // pointerEvents={'none'}
                        style={{
                            // flex:1,
                            backgroundColor:'transparent',
                            transform: [{
                                translateY: this.state.scrollY.interpolate({
                                    inputRange: [-255, 0, 255 - 44 ],
                                    outputRange: [0 , 0, 44],
                                    extrapolate: 'clamp',
                                })
                            }]
                        }}
                        showsVerticalScrollIndicator={true}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
                        // onScroll={(e)=>{console.log(e.nativeEvent.contentOffset.y)}}
                    >
                        <View style={{width:dw,height:245,backgroundColor:'transparent'}}></View>
                        <View style={{width:dw,height:100,backgroundColor:'red'}}>
                            <View style={{width:dw,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <TouchableWithoutFeedback onPress={this.click}>
                                <View style={{width:dw/3,height:50,flexDirection:'row',backgroundColor:'blue',justifyContent:'center',alignItems:'center'}}>
                                    <Text>龙龟</Text>
                                </View>
                                </TouchableWithoutFeedback>
                                <View style={{width:dw/3,height:50,flexDirection:'row',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                    <Text>牛头</Text>
                                </View>
                                <View style={{width:dw/3,height:50,flexDirection:'row',backgroundColor:'yellow',justifyContent:'center',alignItems:'center'}}>
                                    <Text>哈士奇</Text>
                                </View>
                            </View>
                        </View>
                        {this.renderChird()}
                    </Animated.ScrollView>
                    <Animated.View style={{
                                opacity: this.state.scrollY.interpolate({
                                    inputRange: [0, 255],
                                    outputRange: [0, 1, ], // -255: 2, 0: 1, 255: 1  当scrollY在-255到0时，scale按照2-1的动画运动；当scrollY在0-255时，scale不变。可以输入任意数量对应的值，但必须是递增或者相等
                                    extrapolate: 'clamp',
                                }),
                        width:dw,
                        height:44,
                        justifyContent:'center',
                        flexDirection:'row',
                        alignItems:'center',
                        backgroundColor:'yellow',
                        position:'absolute'}}>
                        <Text>前摇后摇晃啊晃</Text>
                    </Animated.View>
                </View>
            )
        }
    renderChird=()=>{
        if(this.state.isSelect==0)
        return(
            <View>
                <View style={{width:dw,height:50,backgroundColor:'green'}}/>
                <View style={{width:dw,height:100,backgroundColor:'blue'}}/>
                <View style={{width:dw,height:100,backgroundColor:'red'}}/>
                <View style={{width:dw,height:100,backgroundColor:'green'}}/>
                <View style={{width:dw,height:100,backgroundColor:'red'}}/>
                <View style={{width:dw,height:500,backgroundColor:'blue'}}/>
            </View>
            )
        return(
            <View style={{width:dw,height:200,backgroundColor:'yellow'}}/>
        )
    }
    click=()=>{
    this.setState({
        isSelect:!this.state.isSelect
    })

    }
        renderHeader=()=>{
            const {scrollY} = this.state
            return(
                <Animated.View
                    style={[ {
                        backgroundColor:'white',
                        height: 255,
                        position:'absolute',
                        transform: [ {
                            translateY: scrollY.interpolate({
                                inputRange: [-255, 0, 255 - 44],
                                outputRange: [0 , 0, -(255 - 44-44) ],
                                extrapolate: 'clamp',
                            })
                        },
                        //     {
                        //         scaleY: scrollY.interpolate({
                        //         inputRange: [-255, 0, 0],
                        //         outputRange: [3, 1, 1], // -255: 2, 0: 1, 255: 1  当scrollY在-255到0时，scale按照2-1的动画运动；当scrollY在0-255时，scale不变。可以输入任意数量对应的值，但必须是递增或者相等
                        //         extrapolate: 'clamp',
                        //     })
                        // },
                            {
                               scale: scrollY.interpolate({
                                    inputRange: [-255, 0, 0],
                                    outputRange: [3, 1, 1], // -255: 2, 0: 1, 255: 1  当scrollY在-255到0时，scale按照2-1的动画运动；当scrollY在0-255时，scale不变。可以输入任意数量对应的值，但必须是递增或者相等
                                    extrapolate: 'clamp',
                                })
                            }
                            ]
                    }]}>
                    <Image style={{height: 255,width:dw,backgroundColor:'blue'}} source={{uri: ImageData}}
                    />
                </Animated.View>
            )

        }

}