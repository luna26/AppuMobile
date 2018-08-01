import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { loadNewsRequest } from '../../../actions';
import NewItem from './NewItem';
import Header from '../../header/header';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadMore: false,
            sizeScroll: 0
        };
    }
    componentDidMount() {
        this.props.loadNewsRequest(this.props.skip);
        this.props.passRefUpward(this.refs);
    }

    renderNews(newsObj) {
        const { containerActivity } = styles;
        const SERVER_URL = 'http://34.219.69.51';
        if (newsObj.length > 0) {
            return newsObj.map(function (newItem, x) {
                return <NewItem key={x} imageUrl={SERVER_URL + newItem.news_url_image} titleNew={newItem.news_title} dateNew={newItem.news_date} descNew={newItem.news_desc} />
            });
        } else {
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }

    isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = 20;

        if (this.state.sizeScroll != contentSize.height - paddingToBottom) {
            this.setState({ sizeScroll: contentSize.height - paddingToBottom });
            this.setState({ loadMore: true });
        }

        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    loadMoreNews() {
        this.setState({ loadMore: false });
        this.props.loadNewsRequest(this.props.skip);
    }

    showLoaderMoreNews() {
        if (this.props.loading_more_news) {
            const { styleLoadMore, textLoadMore } = styles;
            return (
                <View style={styleLoadMore}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={textLoadMore}>Cargando mas noticias</Text>
                </View>
            );
        }
    }

    render() {
        const { contianerNewsStyle, arrowUpStyle } = styles;
        const { news } = this.props;
        return (
            <View style={{ position: 'relative' }}>
                {this.showLoaderMoreNews()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref='_scrollViewNews'
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent) && this.state.loadMore) {
                            this.loadMoreNews();
                        }
                    }}
                >
                    <Header />
                    <View style={contianerNewsStyle}>
                        {this.renderNews(this.props.news)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    contianerNewsStyle: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'white',
        position: 'relative',
    },
    containerActivity: {
        flex: 1
    },
    styleLoadMore: {
        position: 'absolute',
        top: 0,
        left:0,
        right:0,
        backgroundColor: '#3dc4ff',
        zIndex: 1000,
        paddingBottom:5,
        paddingTop:5
    },
    textLoadMore:{
        textAlign:'center',
        color:'white',
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.home.news,
        skip: state.home.skip,
        loading_more_news: state.home.loading_more_news
    };
};

export default connect(mapStateToProps, { loadNewsRequest })(News, { withRef: true });